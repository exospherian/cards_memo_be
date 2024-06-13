import {
  IsString,
  Length,
  IsOptional,
  IsNumber,
  Min,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class WordUpdateDto {
  @IsUUID()
  @ApiProperty()
  @Expose()
  id: string;

  @IsString()
  @Length(1, 500)
  @IsOptional()
  @ApiProperty()
  @Expose()
  from?: string;

  @IsString()
  @Length(1, 500)
  @IsOptional()
  @ApiProperty()
  @Expose()
  to?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiProperty()
  @Expose()
  order?: number;

  @IsString()
  @Length(0, 500)
  @IsOptional()
  @ApiProperty()
  @Expose()
  transcription?: string;

  @IsString()
  @Length(1, 500)
  @IsOptional()
  @ApiProperty()
  @Expose()
  description?: string;
}
