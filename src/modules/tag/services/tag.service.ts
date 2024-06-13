import { Injectable } from '@nestjs/common';
import { TagStorage } from '../storages';

@Injectable()
export class TagService {
  constructor(private readonly tagStorage: TagStorage) {}

  getAll() {
    return this.tagStorage.getAll();
  }
}
