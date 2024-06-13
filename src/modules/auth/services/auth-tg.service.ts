import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { validate } from '@tma.js/init-data-node';
import { AuthService } from './auth.service';
import { AuthViewDto } from '../dto';
import { AuthProvider, TgUserData } from '../interfaces';
import { AuthStorage } from '../storages';

@Injectable()
export class AuthTgService {
  private SECRET_TOKEN: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly authStorage: AuthStorage,
  ) {
    this.SECRET_TOKEN = this.configService.get<string>('BOT_API_TOKEN');
  }

  async login(body: string): Promise<AuthViewDto> {
    const initDataParams = new URLSearchParams(body);
    const userData: TgUserData = JSON.parse(initDataParams.get('user'));
    validate(initDataParams, this.SECRET_TOKEN);
    let auth = await this.authStorage.getByExternalSub(
      userData.id,
      AuthProvider.TELEGRAM,
    );
    if (!auth) {
      auth = await this.authStorage.registerWithoutPassword(
        userData.id,
        AuthProvider.TELEGRAM,
        {
          nickname: userData.username || userData.first_name,
          lang: userData.language_code,
        },
      );
    }
    const tokens = await this.authService.createTokens(auth.userId);
    return tokens;
  }
}
