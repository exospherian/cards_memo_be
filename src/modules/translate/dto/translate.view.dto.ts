import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class TranslationViewDto {
  @ApiProperty()
  @Expose()
  translation: string;

  @ApiProperty({ required: false })
  @Expose()
  freq?: number;

  @ApiProperty({ required: false })
  @Expose()
  pos?: string;
}

export class TranslateViewDto {
  @ApiProperty({ required: false })
  @Expose()
  transcript?: string;

  @ApiProperty({ type: TranslationViewDto, isArray: true })
  @Expose()
  @Type(() => TranslationViewDto)
  translation: TranslationViewDto[];
}
