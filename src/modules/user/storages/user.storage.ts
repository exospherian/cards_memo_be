import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities';
import { SettingsUpdateDto } from '../dto';

@Injectable()
export class UserStorage {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async get(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException({
        message: `[UserStorage get]: User with id ${id} doesn't exist`,
      });
    }
    return user;
  }

  async updateSettings(id: string, settings: SettingsUpdateDto) {
    await this.userRepository.update({ id }, settings);
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }
}
