import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@app/redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule, AuthModule, DictionaryModule } from './modules';
import { TranslateModule } from './modules/translate';
import { UserEntity } from './modules/user/entities';
import { AuthEntity } from './modules/auth/entities';
import {
  DictionaryEntity,
  PublicDictionaryEntity,
  PublicWordEntity,
  WordEntity,
} from './modules/dictionary/entities';
import { TagEntity, TagGroupEntity } from './modules/tag/entities';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RedisModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
          db: +configService.get('REDIS_DB'),
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
          synchronize: true,
          entities: [
            UserEntity,
            AuthEntity,
            DictionaryEntity,
            WordEntity,
            PublicDictionaryEntity,
            PublicWordEntity,
            TagEntity,
            TagGroupEntity,
          ],
        };
      },
    }),
    AuthModule,
    UserModule,
    DictionaryModule,
    TranslateModule,
    TagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
