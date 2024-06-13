import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthTgService } from '../services';
import { AuthViewDto, TgwDto } from '../dto';
import { plainToInstance } from 'class-transformer';

@Controller('auth-tg')
@ApiTags('auth-tg')
export class AuthTgController {
  constructor(private readonly authTgService: AuthTgService) {}

  @Post('login')
  @ApiCreatedResponse()
  async login(@Body() body: TgwDto): Promise<AuthViewDto> {
    const tokens = await this.authTgService.login(body.initDataRaw);
    return plainToInstance(AuthViewDto, tokens, {
      excludeExtraneousValues: true,
    });
  }
}
