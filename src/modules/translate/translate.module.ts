import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth';
import { SoundController, TranslateController } from './controllers';
import {
  DictionaryCommunicationService,
  TranslateCommunicationService,
  TranslateService,
} from './services';

@Module({
  imports: [AuthModule, ConfigModule],
  controllers: [TranslateController, SoundController],
  providers: [
    TranslateService,
    DictionaryCommunicationService,
    TranslateCommunicationService,
  ],
  exports: [],
})
export class TranslateModule {}
