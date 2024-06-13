import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth';
import {
  DictionaryEntity,
  WordEntity,
  PublicDictionaryEntity,
  PublicWordEntity,
} from './entities';
import {
  DictionaryController,
  StudyController,
  PublicDictionaryController,
} from './controllers';
import {
  DictionaryService,
  StudyService,
  PublicDictionaryService,
} from './services';
import {
  DictionaryStorage,
  StudyStorage,
  PublicDictionaryStorage,
} from './storages';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DictionaryEntity,
      WordEntity,
      PublicDictionaryEntity,
      PublicWordEntity,
    ]),
    AuthModule,
    TagModule,
  ],
  controllers: [
    DictionaryController,
    StudyController,
    PublicDictionaryController,
  ],
  providers: [
    DictionaryService,
    DictionaryStorage,
    StudyStorage,
    StudyService,
    PublicDictionaryService,
    PublicDictionaryStorage,
  ],
  exports: [],
})
export class DictionaryModule {}
