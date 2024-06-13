import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  DictionaryCreateDto,
  DictionaryViewDto,
  DictionaryUpdateDto,
  DictionaryWithWordsViewDto,
} from '../dto';
import { ITokenData } from '../../auth';
import { TokenData, JwtAuthGuard } from '../../auth/utils';
import { DictionaryService } from '../services';

@ApiTags('dictionary')
@Controller('dictionary')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @ApiOkResponse({
    type: DictionaryWithWordsViewDto,
  })
  @Post('')
  async create(
    @TokenData() tokenData: ITokenData,
    @Body() data: DictionaryCreateDto,
  ): Promise<DictionaryWithWordsViewDto> {
    const dictionary = await this.dictionaryService.create(tokenData.sub, data);
    return plainToInstance(DictionaryWithWordsViewDto, dictionary, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOkResponse({
    type: DictionaryViewDto,
    isArray: true,
  })
  @Get('')
  async getAll(
    @TokenData() tokenData: ITokenData,
  ): Promise<DictionaryViewDto[]> {
    const dictionaries = await this.dictionaryService.getAll(tokenData.sub);
    return plainToInstance(DictionaryViewDto, dictionaries, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOkResponse({
    type: DictionaryWithWordsViewDto,
  })
  @Get('/:dictionaryId')
  async get(
    @TokenData() tokenData: ITokenData,
    @Param('dictionaryId', new ParseUUIDPipe()) dictionaryId: string,
  ): Promise<DictionaryWithWordsViewDto> {
    const dictionary = await this.dictionaryService.get(
      tokenData.sub,
      dictionaryId,
    );
    return plainToInstance(DictionaryWithWordsViewDto, dictionary, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOkResponse({
    type: DictionaryWithWordsViewDto,
  })
  @Post('/:dictionaryId')
  async update(
    @TokenData() tokenData: ITokenData,
    @Param('dictionaryId', new ParseUUIDPipe()) dictionaryId: string,
    @Body() data: DictionaryUpdateDto,
  ): Promise<DictionaryWithWordsViewDto> {
    const dictionary = await this.dictionaryService.update(
      tokenData.sub,
      dictionaryId,
      data,
    );
    return plainToInstance(DictionaryWithWordsViewDto, dictionary, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOkResponse()
  @Delete('/:dictionaryId')
  async delete(
    @TokenData() tokenData: ITokenData,
    @Param('dictionaryId', new ParseUUIDPipe()) dictionaryId: string,
  ): Promise<void> {
    await this.dictionaryService.delete(tokenData.sub, dictionaryId);
  }

  @ApiOkResponse({
    type: DictionaryWithWordsViewDto,
  })
  @Post('accept-share/:dictionaryId')
  async acceptShare(
    @TokenData() tokenData: ITokenData,
    @Param('dictionaryId', new ParseUUIDPipe()) dictionaryId: string,
  ): Promise<DictionaryWithWordsViewDto> {
    const dictionary = await this.dictionaryService.acceptShare(
      tokenData.sub,
      dictionaryId,
    );
    return plainToInstance(DictionaryWithWordsViewDto, dictionary, {
      excludeExtraneousValues: true,
    });
  }
}
