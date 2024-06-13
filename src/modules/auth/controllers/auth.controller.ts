import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  SignInUserDto,
  AuthViewDto,
  RefreshDto,
  PasswordRecoveryDto,
  SignUpUserDto,
} from '../dto';
import { AuthService, PasswordService } from '../services';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService,
  ) {}

  @ApiCreatedResponse({
    type: AuthViewDto,
  })
  @Post('sign-up')
  async signUp(@Body() signUn: SignUpUserDto): Promise<AuthViewDto> {
    const tokens = await this.authService.signUp(signUn);
    return plainToInstance(AuthViewDto, tokens, {
      excludeExtraneousValues: true,
    });
  }

  @ApiCreatedResponse({
    type: AuthViewDto,
  })
  @Post('sign-in')
  async signIn(@Body() signIn: SignInUserDto): Promise<AuthViewDto> {
    const tokens = await this.authService.signIn(signIn);
    return plainToInstance(AuthViewDto, tokens, {
      excludeExtraneousValues: true,
    });
  }

  @ApiCreatedResponse({
    type: AuthViewDto,
  })
  @Post('refresh')
  async refresh(@Body() refresh: RefreshDto): Promise<AuthViewDto> {
    const tokens = await this.authService.refresh(refresh);
    return plainToInstance(AuthViewDto, tokens, {
      excludeExtraneousValues: true,
    });
  }

  @ApiCreatedResponse()
  @Post('logout')
  async logout(@Body() refresh: RefreshDto): Promise<void> {
    await this.authService.logout(refresh);
  }

  @ApiCreatedResponse()
  @Post('hard-logout')
  async hardLogout(@Body() refresh: RefreshDto): Promise<void> {
    await this.authService.hardLogout(refresh);
  }

  @ApiCreatedResponse()
  @Post('password-recovery-request')
  async passRecoveryRequest(
    @Body() recovery: PasswordRecoveryDto,
  ): Promise<void> {
    await this.passwordService.recoveryRequest(recovery.email);
  }

  @ApiCreatedResponse()
  @Post('password-recovery/:recoveryId')
  async passRecovery(
    @Param('recoveryId') id: string,
    @Body() { password }: any,
  ): Promise<void> {
    await this.passwordService.changePasswordByRecoveryLink(id, password);
  }
}
