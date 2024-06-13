import { BadRequestException, Injectable } from '@nestjs/common';
import { DictionaryStorage, PublicDictionaryStorage } from '../storages';
import { DictionaryCreateDto, DictionaryQueryDto } from '../dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PublicDictionaryService {
  constructor(
    private readonly publicDictionaryStorage: PublicDictionaryStorage,
    private readonly dictionaryStorage: DictionaryStorage,
  ) {}

  async publish(userId: string, dictionaryId: string) {
    const [dictionary, existedPublicDictionary] = await Promise.all([
      this.dictionaryStorage.getOwnById(userId, dictionaryId),
      this.publicDictionaryStorage.findByDictionaryId(dictionaryId),
    ]);

    if (!dictionary?.tags?.length) {
      throw new BadRequestException({
        message:
          '[PublicDictionaryService publish]: Dictionary should contain tags',
      });
    }

    const dicToPublish = plainToInstance(DictionaryCreateDto, dictionary, {
      excludeExtraneousValues: true,
    });

    const createdPublicDictionary = existedPublicDictionary
      ? await this.update(existedPublicDictionary.id, dicToPublish)
      : await this.publicDictionaryStorage.create(
          userId,
          dictionary.id,
          dicToPublish,
        );
    await this.dictionaryStorage.updateChildPublic(
      dictionaryId,
      createdPublicDictionary.id,
      createdPublicDictionary.updated,
      dictionary.updated,
    );

    const publicDictionary = await this.publicDictionaryStorage.get(
      createdPublicDictionary.id,
    );
    return publicDictionary;
  }

  async update(publicDictionaryId: string, dicToPublish: DictionaryCreateDto) {
    const updated = await this.publicDictionaryStorage.update(
      publicDictionaryId,
      dicToPublish,
    );
    await this.dictionaryStorage.updateDuringPublicUpdate(publicDictionaryId);
    return updated;
  }

  async add(userId: string, dictionaryId: string) {
    const [publicDictionary, existedDictionary] = await Promise.all([
      this.publicDictionaryStorage.get(dictionaryId),
      this.dictionaryStorage.findByPublic(dictionaryId),
    ]);

    const dicToAdd = plainToInstance(DictionaryCreateDto, publicDictionary, {
      excludeExtraneousValues: true,
    });
    const [added] = await Promise.all([
      existedDictionary
        ? this.dictionaryStorage.updateThroughPublic(
            userId,
            existedDictionary.id,
            dicToAdd,
          )
        : this.dictionaryStorage.createThroughPublic(
            userId,
            publicDictionary.id,
            dicToAdd,
          ),
      this.publicDictionaryStorage.increaseCountOfDownload(dictionaryId),
    ]);
    return this.dictionaryStorage.getOwnById(userId, added.id);
  }

  getAllMine(userId: string) {
    return this.publicDictionaryStorage.getAllMine(userId);
  }

  getAll(query: DictionaryQueryDto) {
    return this.publicDictionaryStorage.getAll(query);
  }

  get(dictionaryId: string) {
    return this.publicDictionaryStorage.get(dictionaryId);
  }

  async delete(userId: string, dictionaryId: string) {
    await this.publicDictionaryStorage.delete(userId, dictionaryId);
  }
}
