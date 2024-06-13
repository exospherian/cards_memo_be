export interface DictionaryResponse {
  head: any;
  def: DictionaryDefinition[];
}

export interface DictionaryDefinition {
  text: string;
  pos: string;
  ts: string;
  tr: Translation[];
}

export interface Translation {
  text: string;
  pos: string;
  asp: string;
  fr: number;
  syn: {
    text: string;
    pos: string;
    fr: number;
  }[];
  mean: {
    text: string;
  }[];
}

export interface TranslationResponse {
  code: number;
  lang: string;
  text: string[];
}
