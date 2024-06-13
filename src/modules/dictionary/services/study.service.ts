import { Injectable } from '@nestjs/common';
import { StudyStorage } from '../storages';
import { ProgressDto, StudyQueryDto } from '../dto';

@Injectable()
export class StudyService {
  constructor(private readonly studyStorage: StudyStorage) {}

  async updateGlobalProgress(userId: string, data: ProgressDto) {
    await this.studyStorage.updateGlobalProgress(userId, data);
  }

  async getGlobalLearn(userId: string, query: StudyQueryDto) {
    const firstList = await this.studyStorage.getGlobalLearnFirstList(
      userId,
      query,
    );
    return firstList;
  }
}
