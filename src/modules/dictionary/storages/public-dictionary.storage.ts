import { Repository, ArrayContains } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PublicDictionaryEntity, PublicWordEntity } from '../entities';
import { DictionaryQueryDto, DictionaryCreateDto } from '../dto';
import { pick } from '../../../utils';

@Injectable()
export class PublicDictionaryStorage {
  constructor(
    @InjectRepository(PublicDictionaryEntity)
    private readonly publicDictionaryRepository: Repository<PublicDictionaryEntity>,
    @InjectRepository(PublicWordEntity)
    private readonly publicWordRepository: Repository<PublicWordEntity>,
  ) {}

  async get(dictionaryId: string) {
    const dictionary = await this.publicDictionaryRepository.findOne({
      where: {
        id: dictionaryId,
      },
      relations: ['words'],
    });
    if (!dictionary) {
      throw new BadRequestException({
        message: `[PublicDictionaryStorage get]: Dictionary with id ${dictionaryId} doesn't exist`,
      });
    }
    return dictionary;
  }

  async findByDictionaryId(dictionaryId: string) {
    const dictionary = await this.publicDictionaryRepository.findOne({
      where: {
        dictionaryId,
      },
    });
    return dictionary;
  }

  async getAllMine(userId: string): Promise<PublicDictionaryEntity[]> {
    const dictionaries = await this.publicDictionaryRepository.find({
      where: {
        userId,
      },
    });
    return dictionaries;
  }

  async getAll(query: DictionaryQueryDto): Promise<PublicDictionaryEntity[]> {
    const dictionaries = await this.publicDictionaryRepository.find({
      where: {
        from: query.from,
        to: query.to,
        ...(query.tags && {
          tags: ArrayContains(query.tags),
        }),
      },
      order: {
        countOfDownload: 'ASC',
      },
      take: query.limit,
      skip: query.offset,
    });
    return dictionaries;
  }

  async create(
    userId: string,
    dictionaryId: string,
    data: DictionaryCreateDto,
  ): Promise<PublicDictionaryEntity> {
    const publicDictionary = this.publicDictionaryRepository.create({
      ...data,
      countOfDownload: 0,
      userId,
      dictionaryId,
      words: data.words.map((word) =>
        this.publicWordRepository.create({
          ...word,
        }),
      ),
    });
    const createdPublicDictionary =
      await this.publicDictionaryRepository.save(publicDictionary);
    return createdPublicDictionary;
  }

  async update(
    publicDictionaryId: string,
    data: DictionaryCreateDto,
  ): Promise<PublicDictionaryEntity> {
    try {
      await this.publicDictionaryRepository.manager.transaction(
        async (manager) => {
          const dictionaryRep = manager.getRepository(PublicDictionaryEntity);
          const wordRep = manager.getRepository(PublicWordEntity);
          const dictionaryUpdateData = pick(data, [
            'name',
            'description',
            'tags',
          ]);
          await wordRep.delete({ dictionaryId: publicDictionaryId });
          await Promise.all([
            dictionaryRep.update(
              { id: publicDictionaryId },
              {
                ...dictionaryUpdateData,
                updateExist: false,
              },
            ),
            wordRep.save(
              data.words.map((word) =>
                this.publicWordRepository.create({
                  ...word,
                  dictionaryId: publicDictionaryId,
                }),
              ),
            ),
          ]);
        },
      );
      return this.get(publicDictionaryId);
    } catch (e) {
      throw new BadRequestException(e?.message);
    }
  }

  async updateDuringDictionaryUpdate(dictionaryId: string) {
    await this.publicDictionaryRepository.update(
      { dictionaryId },
      { updateExist: true },
    );
  }

  async increaseCountOfDownload(dictionaryId: string) {
    await this.publicDictionaryRepository.increment(
      { id: dictionaryId },
      'countOfDownload',
      1,
    );
  }

  async delete(userId: string, dictionaryId: string) {
    await this.publicDictionaryRepository.delete({ id: dictionaryId, userId });
  }
}
