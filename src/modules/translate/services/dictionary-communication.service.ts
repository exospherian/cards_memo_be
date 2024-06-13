import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TranslateQueryDto } from '../dto';
import { DictionaryResponse } from '../interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DictionaryCommunicationService {
  constructor(private readonly configService: ConfigService) {}

  async getDictionary(data: TranslateQueryDto): Promise<DictionaryResponse> {
    try {
      const response = await axios.get<DictionaryResponse>(
        'https://dictionary.yandex.net/api/v1/dicservice.json/lookup',
        {
          params: {
            key: this.configService.get('DICTIONARY_TOKEN'),
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
