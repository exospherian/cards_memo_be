import { IsString, Length, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class WordCreateDto {
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

  @IsNumber()
  @Min(0)
  @ApiProperty()
  @Expose()
  order: number;

  @IsString()
  @Length(1, 500)
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
