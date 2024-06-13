import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TagEntity, TagGroupEntity } from '../entities';

@Injectable()
export class TagStorage {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(TagGroupEntity)
    private readonly tagGroupRepository: Repository<TagGroupEntity>,
  ) {}

  getAll() {
    return this.tagGroupRepository.find({
      relations: ['tags'],
    });
  }

  async check(tags: number[]) {
    if (!(tags && tags?.length)) return;
    const existTags = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });

    if (tags.length !== existTags.length) {
      throw new BadRequestException({
        message: `[TagStorage check]: Some of tags don't exist`,
      });
    }
  }
}
