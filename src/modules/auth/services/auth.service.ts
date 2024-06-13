import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '@app/bcrypt';
import { AuthViewDto, RefreshDto, SignInUserDto, SignUpUserDto } from '../dto';
import { AuthRedisStorage, AuthStorage } from '../storages';
import { ITokenData } from '../interfaces';

@Injectable()
export class AuthService {
  JWT_TTL: number;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authStorage: AuthStorage,
    private readonly bcryptService: BcryptService,
    private readonly authRedisStorage: AuthRedisStorage,
  ) {
    this.JWT_TTL = +this.configService.get('JWT_EXPIRATION_PERIOD');
  }

  async createTokens(userId: string) {
    const tokens = this.createUserTokens(userId);
    await this.authRedisStorage.addNewSession(userId, tokens.refresh);
    return tokens;
  }

  async signUp(signUn: SignUpUserDto): Promise<AuthViewDto> {
    const hashedPassword = await this.bcryptService.hashPassword(
      signUn.password,
    );
    signUn.password = hashedPassword;
    const auth = await this.authStorage.registerWithPassword(signUn);
    const tokens = await this.createTokens(auth.userId);
    return tokens;
  }

  async signIn(signIn: SignInUserDto): Promise<AuthViewDto> {
    const auth = await this.authStorage.findByEmail(signIn.email);
    if (!auth)
      throw new BadRequestException({
        message: '[AuthService signIn]: Email or password are invalid',
      });
    const isValidPass = await this.checkPass(auth.password, signIn.password);
    if (!isValidPass)
      throw new BadRequestException({
        message: '[AuthService signIn]: Email or password are invalid',
      });

    const tokens = this.createUserTokens(auth.userId);
    await this.authRedisStorage.addNewSession(auth.userId, tokens.refresh);
    return tokens;
  }

  async refresh(refresh: RefreshDto): Promise<AuthViewDto> {
    const data = this.jwtService.decode(refresh.token) as ITokenData;
    const isExist = await this.authRedisStorage.checkSession(
      data?.sub,
      refresh.token,
    );

    if (!isExist)
      throw new UnauthorizedException({
        message: '[AuthService refresh]: No active auth session exists',
        data: {
          token: refresh.token,
        },
      });

    const newTokens = this.createUserTokens(data.sub);
    await this.authRedisStorage.replaceToken(
      data.sub,
      refresh.token,
      newTokens.refresh,
    );
    return newTokens;
  }

  async logout(refresh: RefreshDto): Promise<void> {
    const data = this.jwtService.decode(refresh.token) as ITokenData;
    await this.authRedisStorage.deleteSession(data.sub, refresh.token);
  }

  async hardLogout(refresh: RefreshDto): Promise<void> {
    const data = this.jwtService.decode(refresh.token) as ITokenData;
    await this.authRedisStorage.deleteAllSession(data.sub);
  }

  private checkPass(hash: string, pass: string) {
    return this.bcryptService.comparePassword(hash, pass);
  }

  createUserTokens(id: string): AuthViewDto {
    const tokenData: ITokenData = {
      sub: id,
    };
    return {
      access: this.jwtService.sign(tokenData, { expiresIn: this.JWT_TTL }),
      refresh: this.jwtService.sign(tokenData),
    };
  }
}
