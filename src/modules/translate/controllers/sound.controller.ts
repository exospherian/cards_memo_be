import { Controller, Get, Header, Query, Res, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import * as Gtts from 'gtts';
import { JwtAuthGuard } from '../../auth/utils';
import { SoundQueryDto } from '../dto';

@ApiTags('sound')
@Controller('sound')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SoundController {
  constructor() {}

  @ApiOkResponse()
  @Header('Content-Type', 'audio/mpeg')
  @Get('')
  async sound(@Query() data: SoundQueryDto, @Res() res: Response) {
    const gtts = new Gtts(data.text, data.from);
    gtts.stream().pipe(res);
  }
}
