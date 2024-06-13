import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserViewDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  nickname: string;

  @ApiProperty()
  @Expose()
  defaultFrom: string;

  @ApiProperty()
  @Expose()
  defaultTo: string;

  @ApiProperty()
  @Expose()
  lang: string;
}
