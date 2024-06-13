import { Injectable } from '@nestjs/common';
import { UserStorage } from '../storages';
import { SettingsUpdateDto } from '../dto';

@Injectable()
export class UserService {
  constructor(private readonly userStorage: UserStorage) {}

  get(id: string) {
    return this.userStorage.get(id);
  }

  updateSettings(id: string, settings: SettingsUpdateDto) {
    return this.userStorage.updateSettings(id, settings);
  }
}
