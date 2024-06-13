import {
  IsString,
  Length,
  ArrayMaxSize,
  IsOptional,
  ValidateNested,
  IsInt,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { WordCreateDto } from './word.create.dto';

export class DictionaryCreateDto {
  @IsString()
  @Length(1, 255)
  @ApiProperty()
  @Expose()
  name: string;

  @IsString()
  @Length(1, 500)
  @ApiProperty()
  @Expose()
  from: string;

  @IsString()
  @Length(1, 500)
  @ApiProperty()
  @Expose()
  to: string;

  @IsString()
  @Length(1, 500)
  @IsOptional()
  @ApiProperty()
  @Expose()
  description?: string;

  @IsInt({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(50)
  @IsOptional()
  @ApiProperty({ type: Number, isArray: true, required: false })
  @Expose()
  tags?: number[];

  @ApiProperty({ type: WordCreateDto, isArray: true })
  @Expose()
  @IsOptional()
  @ArrayMaxSize(500)
  @ValidateNested()
  @Type(() => WordCreateDto)
  words: WordCreateDto[];
}
