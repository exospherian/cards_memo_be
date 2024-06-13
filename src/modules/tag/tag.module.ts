import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity, TagGroupEntity } from './entities';
import { TagStorage } from './storages';
import { TagController } from './controllers';
import { TagService } from './services';
import { AuthModule } from '../auth';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, TagGroupEntity]), AuthModule],
  controllers: [TagController],
  providers: [TagStorage, TagService],
  exports: [TagStorage],
})
export class TagModule {}
