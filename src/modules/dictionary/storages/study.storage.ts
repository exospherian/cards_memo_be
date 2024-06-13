import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { WordEntity } from '../entities';
import { ProgressDto, StudyQueryDto } from '../dto';
import { DictionaryStorage } from './dictionary.storage';

@Injectable()
export class StudyStorage {
  constructor(
    @InjectRepository(WordEntity)
    private readonly wordRepository: Repository<WordEntity>,
    private readonly dictionaryStorage: DictionaryStorage,
  ) {}

  async updateGlobalProgress(userId: string, data: ProgressDto) {
    await Promise.all([
      data.up &&
        this.wordRepository
          .createQueryBuilder()
          .update()
          .set({
            globalProgress: () =>
              `CASE WHEN globalProgress < 10 THEN globalProgress + 1 ELSE globalProgress END`,
          })
          .where({ id: In(data.up), userId })
          .execute(),
      data.down &&
        this.wordRepository.update(
          { id: In(data.down), userId },
          { globalProgress: 0 },
        ),
    ]);
  }

  async getGlobalLearnFirstList(userId: string, query: StudyQueryDto) {
    const dictionaries = await this.dictionaryStorage.getAllForStudy(
      userId,
      query,
    );
    if (!dictionaries.length)
      throw new BadRequestException(
        'You dont have dictionaries with such settings',
      );
    const list = await this.wordRepository.find({
      where: {
        dictionaryId: In(dictionaries.map((dic) => dic.id)),
      },
    });
    return list;
  }

  async getGlobalLearnByLvl(userId: string, lvl: number, limit: number) {
    const list = await this.wordRepository.find({
      where: {
        userId,
        globalProgress: lvl,
      },
      order: {
        globalProgress: 'ASC',
      },
      take: limit,
    });
    return list;
  }
}
