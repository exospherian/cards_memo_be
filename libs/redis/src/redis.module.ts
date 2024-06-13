import {
  Module,
  FactoryProvider,
  DynamicModule,
  ModuleMetadata,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisOptions } from 'ioredis';
import { REDIS_CLIENT_TOKEN, REDIS_OPTIONS_CLIENT_TOKEN } from './consts';

interface RedisModuleOptions extends ModuleMetadata {
  useFactory: (...args: any[]) => Promise<RedisOptions> | RedisOptions;
}

const redisClientProvider: FactoryProvider = {
  provide: REDIS_CLIENT_TOKEN,
  useFactory: (config: RedisOptions) => {
    return new Redis(config);
  },
  inject: [REDIS_OPTIONS_CLIENT_TOKEN],
};

@Module({})
export class RedisModule {
  static registerAsync(option: RedisModuleOptions): DynamicModule {
    return {
      global: true,
      module: RedisModule,
      imports: [...option.imports],
      providers: [this.createRedisOptionProvider(option), redisClientProvider],
      exports: [redisClientProvider],
    };
  }

  static createRedisOptionProvider(
    option: RedisModuleOptions,
  ): FactoryProvider {
    return {
      provide: REDIS_OPTIONS_CLIENT_TOKEN,
      useFactory: option.useFactory,
      inject: [ConfigService],
    };
  }
}
