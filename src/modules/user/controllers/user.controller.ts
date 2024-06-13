import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { SettingsUpdateDto, UserViewDto } from '../dto';
import { ITokenData } from '../../auth';
import { TokenData, JwtAuthGuard } from '../../auth/utils';
import { UserService } from '../services';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: UserViewDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getMe(@TokenData() tokenData: ITokenData): Promise<UserViewDto> {
    const user = await this.userService.get(tokenData.sub);
    return plainToInstance(UserViewDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOkResponse({
    type: UserViewDto,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('setting')
  async changeSettings(
    @TokenData() tokenData: ITokenData,
    @Body() settings: SettingsUpdateDto,
  ): Promise<UserViewDto> {
    const user = await this.userService.updateSettings(tokenData.sub, settings);
    return plainToInstance(UserViewDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
