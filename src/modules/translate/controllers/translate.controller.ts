import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../../auth/utils';
import { TranslateService } from '../services';
import { TranslateQueryDto, TranslateViewDto } from '../dto';

@ApiTags('translate')
@Controller('translate')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TranslateController {
  constructor(private readonly translateService: TranslateService) {}

  @ApiOkResponse({
    type: TranslateViewDto,
  })
  @Get('')
  async get(@Query() data: TranslateQueryDto): Promise<TranslateViewDto> {
    const translate = await this.translateService.translate(data);
    return plainToInstance(TranslateViewDto, translate, {
      excludeExtraneousValues: true,
    });
  }
}
