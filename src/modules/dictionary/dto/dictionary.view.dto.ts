import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { WordViewDto } from './word.view.dto';

export class DictionaryWithWordsViewDto {
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
  updated: string;

  @ApiProperty()
  @Expose()
  childPublicDictionaryId: string;

  @ApiProperty()
  @Expose()
  lastPublishTime: string;

  @ApiProperty()
  @Expose()
  tags: number[];

  @ApiProperty({ nullable: true })
  @Expose()
  publicDictionaryId: string;

  @ApiProperty({ nullable: true })
  @Expose()
  updateExist: boolean;

  @ApiProperty({ nullable: true })
  @Expose()
  shareUserId: string;

  @ApiProperty({ type: WordViewDto, isArray: true })
  @Expose()
  @Type(() => WordViewDto)
  words: WordViewDto[];
}

export class DictionaryViewDto {
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
  updated: string;

  @ApiProperty()
  @Expose()
  childPublicDictionaryId: string;

  @ApiProperty()
  @Expose()
  lastPublishTime: string;

  @ApiProperty()
  @Expose()
  tags: number[];

  @ApiProperty({ nullable: true })
  @Expose()
  publicDictionaryId: string;

  @ApiProperty({ nullable: true })
  @Expose()
  updateExist: boolean;

  @ApiProperty({ nullable: true })
  @Expose()
  shareUserId: string;
}
