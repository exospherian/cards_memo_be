import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TranslateQueryDto } from '../dto';
import { TranslationResponse } from '../interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TranslateCommunicationService {
  constructor(private readonly configService: ConfigService) {}

  async getTranslation(data: TranslateQueryDto): Promise<TranslationResponse> {
    try {
      const response = await axios.get<TranslationResponse>(
        'https://translate.yandex.net/api/v1.5/tr.json/translate',
        {
          params: {
            key: this.configService.get('TRANSLATE_TOKEN'),
            lang: `${data.from}-${data.to}`,
            text: data.text,
          },
        },
      );
      return response.data;
    } catch (e) {
      return null;
    }
  }
}
