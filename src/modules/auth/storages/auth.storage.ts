import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AuthEntity } from '../entities';
import { AuthProvider } from '../../auth/interfaces';
import { SignUpUserDto } from '../dto';
import { UserEntity } from '../../user';

@Injectable()
export class AuthStorage {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  getByExternalSub(sub: string | number, provider: AuthProvider) {
    return this.authRepository.findOne({
      where: {
        externalSub: sub.toString(),
        provider,
      },
    });
  }

  findByEmail(email: string) {
    return this.authRepository.findOne({
      where: {
        email,
      },
    });
  }

  async registerWithPassword(signUn: SignUpUserDto) {
    const auth = this.authRepository.create({
      email: signUn.email,
      password: signUn.password,
      user: {
        nickname: signUn.nickname,
        lang: signUn.lang,
      },
      provider: AuthProvider.LOGIN,
    });
    const createdAuth = await this.authRepository.save(auth);
    return createdAuth;
  }

  async registerWithoutPassword(
    sub: string | number,
    provider: AuthProvider,
    userInfo?: Partial<UserEntity>,
  ) {
    const auth = this.authRepository.create({
      externalSub: sub.toString(),
      user: {
        ...userInfo,
      },
      provider,
    });
    const createdAuth = await this.authRepository.save(auth);
    return createdAuth;
  }
}
