import { BadRequestException, Injectable } from '@nestjs/common';
import { DictionaryStorage, PublicDictionaryStorage } from '../storages';
import { DictionaryCreateDto, DictionaryUpdateDto } from '../dto';
import { DictionaryEntity } from '../entities';
import { TagStorage } from '../../tag/storages';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class DictionaryService {
  constructor(
    private readonly dictionaryStorage: DictionaryStorage,
    private readonly tagStorage: TagStorage,
    private readonly publicDictionaryStorage: PublicDictionaryStorage,
  ) {}

  async create(
    userId: string,
    data: DictionaryCreateDto,
  ): Promise<DictionaryEntity> {
    await this.tagStorage.check(data.tags);
    const createdDictionary = await this.dictionaryStorage.create(userId, data);
    const dictionary = await this.dictionaryStorage.getOwnById(
      userId,
      createdDictionary.id,
    );
    return dictionary;
  }

  async update(
    userId: string,
    dictionaryId: string,
    data: DictionaryUpdateDto,
  ): Promise<DictionaryEntity> {
    await Promise.all([
      this.dictionaryStorage.getOwnById(userId, dictionaryId),
      this.tagStorage.check(data.tags),
    ]);
    await this.dictionaryStorage.update(userId, dictionaryId, data);
    await this.publicDictionaryStorage.updateDuringDictionaryUpdate(
      dictionaryId,
    );
    const updatedDictionary = await this.dictionaryStorage.getOwnById(
      userId,
      dictionaryId,
    );
    return updatedDictionary;
  }

  getAll(userId: string): Promise<DictionaryEntity[]> {
    return this.dictionaryStorage.getAll(userId);
  }

  async get(userId: string, dictionaryId: string): Promise<DictionaryEntity> {
    const dictionary = await this.dictionaryStorage.getOwnById(
      userId,
      dictionaryId,
    );
    return dictionary;
  }

  async delete(userId: string, dictionaryId: string) {
    await this.dictionaryStorage.getOwnById(userId, dictionaryId);
    await this.dictionaryStorage.delete(userId, dictionaryId);
  }

  async acceptShare(userId: string, dictionaryId: string) {
    const dictionary = await this.dictionaryStorage.getById(dictionaryId);

    if (dictionary.userId === userId)
      throw new BadRequestException('You cant add your own dictionary');
    const dicToAdd = plainToInstance(DictionaryCreateDto, dictionary, {
      excludeExtraneousValues: true,
    });

    const createdDictionary = await this.dictionaryStorage.createThroughSharing(
      userId,
      dicToAdd,
      dictionary.userId,
    );
    const sharedDictionary = await this.dictionaryStorage.getOwnById(
      userId,
      createdDictionary.id,
    );
    return sharedDictionary;
  }
}
