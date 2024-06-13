import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProgressDto, StudyQueryDto, WordViewDto } from '../dto';
import { ITokenData } from '../../auth';
import { TokenData, JwtAuthGuard } from '../../auth/utils';
import { StudyService } from '../services';
import { plainToInstance } from 'class-transformer';

@ApiTags('study')
@Controller('study')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class StudyController {
  constructor(private readonly studyService: StudyService) {}

  @ApiOkResponse()
  @Post('global/progress')
  async updateProgress(
    @TokenData() tokenData: ITokenData,
    @Body() body: ProgressDto,
  ) {
    await this.studyService.updateGlobalProgress(tokenData.sub, body);
  }

  @ApiOkResponse({ type: WordViewDto, isArray: true })
  @Get('global')
  async getGlobalLearn(
    @TokenData() tokenData: ITokenData,
    @Query() query: StudyQueryDto,
  ) {
    const list = await this.studyService.getGlobalLearn(tokenData.sub, query);
    return plainToInstance(WordViewDto, list, {
      excludeExtraneousValues: true,
    });
  }
}
