import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class WordViewDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  from: string;

  @ApiProperty()
  @Expose()
  to: string;

  @ApiProperty()
  @Expose()
  order: number;

  @ApiProperty({ nullable: true })
  @Expose()
  transcription: string;

  @ApiProperty()
  @Expose()
  globalProgress: number;

  @ApiProperty()
  @Expose()
  localProgress: number;

  @ApiProperty({ nullable: true })
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  created: string;
}
