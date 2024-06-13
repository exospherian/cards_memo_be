import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class TagViewDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  en: string;

  @ApiProperty()
  @Expose()
  ru: string;
}

export class TagGroupViewDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  en: string;

  @ApiProperty()
  @Expose()
  ru: string;

  @ApiProperty({ type: TagViewDto, isArray: true })
  @Expose()
  @Type(() => TagViewDto)
  tags: TagViewDto[];
}
