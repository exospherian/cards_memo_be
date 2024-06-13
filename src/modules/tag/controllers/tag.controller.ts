import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/utils';
import { TagService } from '../services';
import { plainToInstance } from 'class-transformer';
import { TagGroupViewDto } from '../dto';

@ApiTags('tag')
@Controller('tag')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOkResponse({ type: TagGroupViewDto })
  @Get('get-all')
  async getGlobalLearn() {
    const all = await this.tagService.getAll();
    return plainToInstance(TagGroupViewDto, all, {
      excludeExtraneousValues: true,
    });
  }
}
