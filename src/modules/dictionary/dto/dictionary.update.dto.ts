import {
  ArrayMaxSize,
  IsOptional,
  IsArray,
  IsUUID,
  IsString,
  Length,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { WordCreateDto } from './word.create.dto';
import { WordUpdateDto } from './word.update.dto';

export class DictionaryUpdateDto {
  @IsString()
  @Length(1, 255)
  @IsOptional()
  @ApiProperty()
  @Expose()
  name?: string;

  @IsString()
  @Length(0, 500)
  @IsOptional()
  @ApiProperty()
  @Expose()
  description?: string;

  @IsInt({ each: true })
  @IsOptional()
  @ApiProperty({ type: Number, isArray: true, required: false })
  @Expose()
  tags?: number[];

  @IsArray()
  @ArrayMaxSize(500)
  @IsUUID('4', { each: true })
  @IsOptional()
  @ApiProperty()
  @Expose()
  delete?: string[];

  @ApiProperty({ type: WordCreateDto, isArray: true })
  @Expose()
  @IsOptional()
  @ArrayMaxSize(500)
  @ValidateNested()
  @Type(() => WordCreateDto)
  words?: WordCreateDto[];

  @ApiProperty({ type: WordUpdateDto, isArray: true })
  @Expose()
  @IsOptional()
  @ArrayMaxSize(500)
  @ValidateNested()
  @Type(() => WordUpdateDto)
  updateWords?: WordUpdateDto[];
}
