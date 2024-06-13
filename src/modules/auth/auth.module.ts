import { Module, FactoryProvider, Logger } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BcryptModule } from '@app/bcrypt';
import { RedisModule } from '@app/redis';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './utils';
import { UserModule } from '../user/user.module';
import { AuthRedisStorage, AuthStorage } from './storages';
import { AuthController, AuthTgController } from './controllers';
import { AuthService, AuthTgService, PasswordService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './entities';

const jwtStrategy: FactoryProvider = {
  provide: JwtStrategy,
  useFactory: (configService: ConfigService) => {
    const secret = configService.get('JWT_SECRET');
    return new JwtStrategy(secret);
  },
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule,
    BcryptModule,
    TypeOrmModule.forFeature([AuthEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
        };
      },
    }),
    RedisModule,
    UserModule,
  ],
  providers: [
    jwtStrategy,
    AuthRedisStorage,
    AuthService,
    PasswordService,
    AuthTgService,
    AuthStorage,
    Logger,
  ],
  controllers: [AuthController, AuthTgController],
  exports: [jwtStrategy, AuthRedisStorage],
})
export class AuthModule {}
