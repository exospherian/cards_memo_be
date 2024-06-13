import { ArrayContains, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DictionaryEntity, WordEntity } from '../entities';
import {
  DictionaryCreateDto,
  DictionaryUpdateDto,
  StudyQueryDto,
} from '../dto';
import { pick } from '../../../utils';

@Injectable()
export class DictionaryStorage {
  constructor(
    @InjectRepository(DictionaryEntity)
    private readonly dictionaryRepository: Repository<DictionaryEntity>,
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>,
  ) {}

  async create(
    userId: string,
    data: DictionaryCreateDto,
  ): Promise<DictionaryEntity> {
    try {
      const dictionary = this.dictionaryRepository.create({
        ...data,
        words: data.words.map((word) =>
          this.wordRepository.create({
            ...word,
            userId,
          }),
        ),
        userId,
      });
      const createdDictionary =
        await this.dictionaryRepository.save(dictionary);
      return createdDictionary;
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async createThroughPublic(
    userId: string,
    publicDictionaryId: string,
    data: DictionaryCreateDto,
  ): Promise<DictionaryEntity> {
    try {
      const dictionary = this.dictionaryRepository.create({
        ...data,
        publicDictionaryId,
        words: data.words.map((word) =>
          this.wordRepository.create({
            ...word,
            userId,
          }),
        ),
        userId,
      });
      const createdDictionary =
        await this.dictionaryRepository.save(dictionary);
      return createdDictionary;
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async update(
    userId: string,
    dictionaryId: string,
    data: DictionaryUpdateDto,
  ): Promise<void> {
    try {
      await this.dictionaryRepository.manager.transaction(async (manager) => {
        const dictionaryRep = manager.getRepository(DictionaryEntity);
        const wordRep = manager.getRepository(WordEntity);
        const words = data.words
          ? this.wordRepository.create(
              data.words.map((word) => {
                return {
                  ...word,
                  dictionaryId,
                  userId,
                };
              }),
            )
          : null;
        const updateTasks = data.updateWords
          ? data.updateWords.map((word) =>
              wordRep.update(
                { id: word.id },
                {
                  ...word,
                },
              ),
            )
          : [];
        const dictionaryUpdateData = pick(data, [
          'name',
          'description',
          'tags',
        ]);
        const needDictionaryUpdate =
          Object.keys(dictionaryUpdateData).length > 0;
        await Promise.all([
          data.delete && wordRep.delete({ id: In(data.delete), dictionaryId }),
          words && this.wordRepository.save(words),
          ...updateTasks,
          needDictionaryUpdate &&
            dictionaryRep.update(
              { id: dictionaryId },
              {
                ...dictionaryUpdateData,
                publicDictionaryId: null,
                updateExist: null,
              },
            ),
        ]);
      });
    } catch (e) {
      throw new BadRequestException('Dictionary update problem');
    }
  }

  async updateThroughPublic(
    userId: string,
    dictionaryId: string,
    data: DictionaryCreateDto,
  ): Promise<DictionaryEntity> {
    try {
      await this.dictionaryRepository.manager.transaction(async (manager) => {
        const dictionaryRep = manager.getRepository(DictionaryEntity);
        const wordRep = manager.getRepository(WordEntity);
        const dictionaryUpdateData = pick(data, [
          'name',
          'description',
          'tags',
        ]);
        await wordRep.delete({ dictionaryId });
        await Promise.all([
          dictionaryRep.update(
            { id: dictionaryId },
            {
              ...dictionaryUpdateData,
              updateExist: false,
            },
          ),
          wordRep.save(
            data.words.map((word) =>
              this.wordRepository.create({
                ...word,
                userId,
                dictionaryId,
              }),
            ),
          ),
        ]);
      });
      return this.getOwnById(userId, dictionaryId);
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async createThroughSharing(
    userId: string,
    data: DictionaryCreateDto,
    shareUserId: string,
  ): Promise<DictionaryEntity> {
    try {
      const dictionary = this.dictionaryRepository.create({
        ...data,
        words: data.words.map((word) =>
          this.wordRepository.create({
            ...word,
            userId,
          }),
        ),
        userId,
        shareUserId,
      });
      const createdDictionary =
        await this.dictionaryRepository.save(dictionary);
      return createdDictionary;
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async updateDuringPublicUpdate(publicDictionaryId: string) {
    await this.dictionaryRepository.update(
      { publicDictionaryId },
      { updateExist: true },
    );
  }

  async updateChildPublic(
    dictionaryId: string,
    publicDictionaryId: string,
    publishTime: string,
    oldUpdate: string,
  ) {
    await this.dictionaryRepository.update(
      { id: dictionaryId },
      {
        childPublicDictionaryId: publicDictionaryId,
        lastPublishTime: publishTime,
        updated: oldUpdate,
      },
    );
  }

  async getAll(userId: string): Promise<DictionaryEntity[]> {
    const dictionaries = await this.dictionaryRepository.find({
      where: {
        userId,
      },
    });
    return dictionaries;
  }

  async getAllForStudy(
    userId: string,
    query: StudyQueryDto,
  ): Promise<DictionaryEntity[]> {
    const dictionaries = await this.dictionaryRepository.find({
      where: {
        userId,
        from: query.from,
        to: query.to,
        ...(query.tags && {
          tags: ArrayContains(query.tags),
        }),
      },
    });
    return dictionaries;
  }
  async getCountDictionary(userId: string) {
    const count = await this.dictionaryRepository.count({
      where: {
        userId,
      },
    });
    return count;
  }

  async getCountWordInDictionary(dictionaryId: string) {
    const count = await this.wordRepository.count({
      where: {
        dictionaryId,
      },
    });
    return count;
  }

  async getOwnById(
    userId: string,
    dictionaryId: string,
  ): Promise<DictionaryEntity> {
    const dictionary = await this.dictionaryRepository.findOne({
      where: {
        userId,
        id: dictionaryId,
      },
      relations: ['words'],
    });
    if (!dictionary) {
      throw new BadRequestException({
        message: `[DictionaryStorage getOwnById]: Dictionary with id ${dictionaryId} doesn't exist`,
      });
    }
    return dictionary;
  }

  async getById(dictionaryId: string): Promise<DictionaryEntity> {
    const dictionary = await this.dictionaryRepository.findOne({
      where: {
        id: dictionaryId,
      },
      relations: ['words'],
    });

    if (!dictionary) {
      throw new BadRequestException({
        message: `[DictionaryStorage getById]: Dictionary with id ${dictionaryId} doesn't exist`,
      });
    }
    return dictionary;
  }

  async findByPublic(publicDictionaryId: string): Promise<DictionaryEntity> {
    const dictionary = await this.dictionaryRepository.findOne({
      where: {
        publicDictionaryId,
      },
    });
    return dictionary;
  }

  async delete(userId: string, dictionaryId: string) {
    await this.dictionaryRepository.delete({ id: dictionaryId, userId });
  }
}
