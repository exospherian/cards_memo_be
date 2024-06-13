import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { WordViewDto } from './word.view.dto';

export class PublicDictionaryWithWordsViewDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  from: string;

  @ApiProperty()
  @Expose()
  to: string;

  @ApiProperty({ nullable: true })
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  created: string;

  @ApiProperty()
  @Expose()
  tags: number[];

  @ApiProperty()
  @Expose()
  countOfDownload: number;

  @ApiProperty()
  @Expose()
  dictionaryId: string;

  @ApiProperty()
  @Expose()
  updateExist: boolean;

  @ApiProperty({ type: WordViewDto, isArray: true })
  @Expose()
  @Type(() => WordViewDto)
  words: WordViewDto[];
}

export class PublicDictionaryViewDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  from: string;

  @ApiProperty()
  @Expose()
  to: string;

  @ApiProperty({ nullable: true })
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  created: string;

  @ApiProperty()
  @Expose()
  tags: number[];

  @ApiProperty()
  @Expose()
  countOfDownload: number;

  @ApiProperty()
  @Expose()
  dictionaryId: string;

  @ApiProperty()
  @Expose()
  updateExist: boolean;
}
