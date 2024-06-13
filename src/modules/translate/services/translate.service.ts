import { Injectable } from '@nestjs/common';
import {
  TranslateQueryDto,
  TranslateViewDto,
  TranslationViewDto,
} from '../dto';
import { DictionaryCommunicationService } from './dictionary-communication.service';
import { TranslateCommunicationService } from './translate-communication.service';

@Injectable()
export class TranslateService {
  constructor(
    private readonly dictionaryCommunicationService: DictionaryCommunicationService,
    private readonly translateCommunicationService: TranslateCommunicationService,
  ) {}

  async translate(data: TranslateQueryDto): Promise<TranslateViewDto> {
    const countOfWords = data.text.split(' ').length;
    if (countOfWords === 1) {
      const res = await this.singleTranslation(data);
      if (!res.translation) {
        const res = await this.multipleTranslation(data);
        return res;
      }
      return res;
    }
    const res = await this.multipleTranslation(data);
    return res;
  }

  async singleTranslation(data: TranslateQueryDto) {
    const res = await this.dictionaryCommunicationService.getDictionary(data);
    if (!res?.def || !res?.def.length)
      return {
        transcript: null,
        translation: null,
      };
    const translation = res.def.flatMap((def) =>
      def.tr.map<TranslationViewDto>((tr) => ({
        translation: tr.text,
        freq: tr.fr,
        pos: tr.pos,
      })),
    );
    return {
      transcript: res.def[0].ts,
      translation,
    };
  }

  async multipleTranslation(
    data: TranslateQueryDto,
  ): Promise<TranslateViewDto> {
    const res = await this.translateCommunicationService.getTranslation(data);
    if (!res)
      return {
        transcript: null,
        translation: null,
      };
    const { text } = res;
    const translation = text[0];
    return {
      transcript: null,
      translation: [
        {
          translation,
        },
      ],
    };
  }
}
