import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { UserStorage } from './storages';
import { UserController } from './controllers';
import { UserService } from './services';
import { AuthModule } from '../auth';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserStorage, UserService],
  exports: [UserStorage],
})
export class UserModule {}
