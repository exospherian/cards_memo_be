import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  DictionaryQueryDto,
  PublicDictionaryWithWordsViewDto,
  PublicDictionaryViewDto,
  DictionaryWithWordsViewDto,
} from '../dto';
import { ITokenData } from '../../auth';
import { TokenData, JwtAuthGuard } from '../../auth/utils';
import { PublicDictionaryService } from '../services';

@ApiTags('public-dictionary')
@Controller('public-dictionary')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PublicDictionaryController {
  constructor(
    private readonly publicDictionaryService: PublicDictionaryService,
  ) {}

  @ApiOkResponse({
    type: PublicDictionaryWithWordsViewDto,
  })
  @Post('publish/:dictionaryId')
  async publish(
    @TokenData() tokenData: ITokenData,
    @Param('dictionaryId', new ParseUUIDPipe()) dictionaryId: string,
  ) {
    const dictionary = await this.publicDictionaryService.publish(
      tokenData.sub,
      dictionaryId,
    );

    return plainToInstance(PublicDictionaryWithWordsViewDto, dictionary, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOkResponse({
    type: DictionaryWithWordsViewDto,
  })
  @Post('add/:dictionaryId')
  async addPublic(
    @TokenData() tokenData: ITokenData,
    @Param('dictionaryId', new ParseUUIDPipe()) dictionaryId: string,
  ) {
    const dictionary = await this.publicDictionaryService.add(
      tokenData.sub,
      dictionaryId,
    );

    return plainToInstance(DictionaryWithWordsViewDto, dictionary, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOkResponse({
    type: PublicDictionaryViewDto,
    isArray: true,
  })
  @Get('mine')
  async getAllMine(
    @TokenData() tokenData: ITokenData,
  ): Promise<PublicDictionaryViewDto[]> {
    const dictionaries = await this.publicDictionaryService.getAllMine(
      tokenData.sub,
    );
    return plainToInstance(PublicDictionaryViewDto, dictionaries, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOkResponse({
    type: PublicDictionaryViewDto,
    isArray: true,
  })
  @Get('')
  async getAll(
    @Query() query: DictionaryQueryDto,
  ): Promise<PublicDictionaryViewDto[]> {
    const dictionaries = await this.publicDictionaryService.getAll(query);
    return plainToInstance(PublicDictionaryViewDto, dictionaries, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOkResponse({
    type: PublicDictionaryWithWordsViewDto,
  })
  @Get('public/:dictionaryId')
  async get(
    @Param('dictionaryId', new ParseUUIDPipe()) dictionaryId: string,
  ): Promise<PublicDictionaryWithWordsViewDto> {
    const dictionary = await this.publicDictionaryService.get(dictionaryId);
    return plainToInstance(PublicDictionaryWithWordsViewDto, dictionary, {
      excludeExtraneousValues: true,
    });
  }

  @ApiOkResponse()
  @Delete('public/:dictionaryId')
  async delete(
    @TokenData() tokenData: ITokenData,
    @Param('dictionaryId', new ParseUUIDPipe()) dictionaryId: string,
  ): Promise<void> {
    await this.publicDictionaryService.delete(tokenData.sub, dictionaryId);
  }
}
