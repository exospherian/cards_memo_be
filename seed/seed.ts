import { DataSource } from 'typeorm';
import { PublicWordEntity } from '../src/modules/dictionary/entities/public-word.entity';
import { PublicDictionaryEntity } from '../src/modules/dictionary/entities/public-dictionary.entity';
import { UserEntity } from '../src/modules/user/entities';
import { AuthEntity } from '../src/modules/auth/entities';
import { TagEntity, TagGroupEntity } from '../src/modules/tag/entities';

const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'devusername',
  password: 'devpassword',
  database: 'dev-bd',
  synchronize: false,
  entities: [
    PublicDictionaryEntity,
    PublicWordEntity,
    UserEntity,
    AuthEntity,
    TagEntity,
    TagGroupEntity,
  ],
});

async function main() {
  await PostgresDataSource.initialize();

  const dicRepo = PostgresDataSource.manager.getRepository(
    PublicDictionaryEntity,
  );

  const tagGroupRepo = PostgresDataSource.manager.getRepository(TagGroupEntity);
  const tagRepo = PostgresDataSource.manager.getRepository(TagEntity);

  await dicRepo.delete({});
  await tagGroupRepo.delete({});

  const tagsToCreate = tagGroupRepo.create([
    {
      name: 'Topic',
      en: 'Topic',
      ru: 'Уровень сложности языка',
      tags: [
        {
          name: 'Sport',
          en: 'Sport',
          ru: 'Спорт',
        },
        {
          name: 'Clothes',
          en: 'Clothes',
          ru: 'Одежда',
        },
      ],
    },
    {
      name: 'Language lvl',
      en: 'Language lvl',
      ru: 'Уровень сложности языка',
      tags: [
        {
          name: 'Beginner',
          en: 'Beginner',
          ru: 'Начальный',
        },
        {
          name: 'Pre Intermediate',
          en: 'Pre Intermediate',
          ru: 'Ниже Среднего',
        },
        {
          name: 'Intermediate',
          en: 'Intermediate',
          ru: 'Средний',
        },
        {
          name: 'Upper Intermediate',
          en: 'Upper Intermediate',
          ru: 'Выше Среднего',
        },
        {
          name: 'Advanced',
          en: 'Advanced',
          ru: 'Продвинутый',
        },
        {
          name: 'Proficient',
          en: 'Proficient',
          ru: 'Профессиональный',
        },
      ],
    },
  ]);
  await tagGroupRepo.save(tagsToCreate);
  const tags = await tagRepo.find();
  const beginnerTag = tags.find((tag) => tag.name === 'Beginner');
  const preIntermediateTag = tags.find(
    (tag) => tag.name === 'Pre Intermediate',
  );
  const intermediateTag = tags.find((tag) => tag.name === 'Intermediate');

  const dic = dicRepo.create([
    {
      name: 'easy',
      from: 'en',
      to: 'ru',
      tags: [beginnerTag.id],
      words: [
        {
          from: 'hi',
          to: 'привет',
          transcription: 'haɪ',
        },
        {
          from: 'say',
          to: 'сказать',
          transcription: 'seɪ',
        },
        {
          from: 'way',
          to: 'путь',
          transcription: 'weɪ',
        },
        {
          from: 'ok',
          to: 'ладно',
          transcription: 'əʊˈkeɪ',
        },
        {
          from: 'switch',
          to: 'переключатель',
          transcription: 'swɪʧ',
        },
        {
          from: 'bottom',
          to: 'дно',
          transcription: 'ˈbɒtəm',
        },
        {
          from: 'transfer',
          to: 'перемещение',
          transcription: 'ˈtrænsfɜː',
        },
        {
          from: 'sun',
          to: 'солнце',
          transcription: 'sʌn',
        },
        {
          from: 'button',
          to: 'кнопка',
          transcription: 'bʌtn',
        },
        {
          from: 'look',
          to: 'смотреть',
          transcription: 'lʊk',
        },
        {
          from: 'how',
          to: 'как',
          transcription: 'haʊ',
        },
        {
          from: 'love',
          to: 'любовь',
          transcription: 'lʌv',
        },
        {
          from: 'like',
          to: 'любить',
          transcription: 'laɪk',
        },
        {
          from: 'true',
          to: 'истинный',
          transcription: 'truː',
        },
        {
          from: 'false',
          to: 'ложный',
          transcription: 'fɔːls',
        },
        {
          from: 'good',
          to: 'хороший',
          transcription: 'gʊd',
        },
      ],
    },
    {
      name: 'medium 1',
      from: 'en',
      to: 'ru',
      tags: [preIntermediateTag.id],
      words: [
        {
          from: 'bitch',
          to: 'сука',
          transcription: 'bɪʧ',
        },
        {
          from: 'beach',
          to: 'пляж',
          transcription: 'biːʧ',
        },
        {
          from: 'local',
          to: 'местный',
          transcription: 'ˈləʊkəl',
        },
        {
          from: 'rural',
          to: 'сельский',
          transcription: 'ˈrʊərəl',
        },
        {
          from: 'boundary',
          to: 'граница',
          transcription: 'ˈbaʊndərɪ',
        },
        {
          from: 'rich',
          to: 'богатый',
          transcription: 'rɪʧ',
        },
        {
          from: 'kill',
          to: 'убивать',
          transcription: 'kɪl',
        },
        {
          from: 'violence',
          to: 'насилие',
          transcription: 'ˈvaɪələns',
        },
        {
          from: 'damage',
          to: 'повреждение',
          transcription: 'ˈdæmɪʤ',
        },
        {
          from: 'negotiation',
          to: 'ведение переговоров',
          transcription: 'nɪgəʊʃɪˈeɪʃn',
        },
        {
          from: 'task',
          to: 'задача',
          transcription: 'tɑːsk',
        },
        {
          from: 'task',
          to: 'задача',
          transcription: 'tɑːsk',
        },
        {
          from: 'high',
          to: 'высокий',
          transcription: 'haɪ',
        },
        {
          from: 'tough',
          to: 'жесткий',
          transcription: 'tʌf',
        },
        {
          from: 'chess',
          to: 'шахматы',
          transcription: 'ʧes',
        },
        {
          from: 'horse',
          to: 'лошадь',
          transcription: 'hɔːs',
        },
      ],
    },
    {
      name: 'medium 2',
      from: 'en',
      to: 'ru',
      tags: [preIntermediateTag.id, intermediateTag.id],
      words: [
        {
          from: 'own',
          to: 'собственный',
          transcription: 'əʊn',
        },
        {
          from: 'cruel',
          to: 'жестокий',
          transcription: 'ˈkruːəl',
        },
        {
          from: 'transcription',
          to: 'транскрипция',
          transcription: 'trænsˈkrɪpʃn',
        },
        {
          from: 'list',
          to: 'список',
          transcription: 'lɪst',
        },
        {
          from: 'never',
          to: 'никогда',
          transcription: 'ˈnevə',
        },
        {
          from: 'always',
          to: 'всегда',
          transcription: 'ˈɔːlw(e)ɪz',
        },
        {
          from: 'senior',
          to: 'старший',
          transcription: 'ˈsiːnɪə',
        },
        {
          from: 'junior',
          to: 'младший',
          transcription: 'ˈʤuːnɪə',
        },
        {
          from: 'medium',
          to: 'средний',
          transcription: 'ˈmiːdɪəm',
        },
        {
          from: 'guess',
          to: 'догадываться',
          transcription: 'ges',
        },
        {
          from: 'wonder',
          to: 'удивляться',
          transcription: 'ˈwʌndə',
        },
        {
          from: 'child',
          to: 'ребенок',
          transcription: 'ʧaɪld',
        },
        {
          from: 'satisfaction',
          to: 'удовлетворение',
          transcription: 'sætɪsˈfækʃn',
        },
        {
          from: 'liver',
          to: 'печень',
          transcription: 'ˈlɪvə',
        },
        {
          from: 'heart',
          to: 'сердце',
          transcription: 'hɑːt',
        },
        {
          from: 'head',
          to: 'голова',
          transcription: 'hed',
        },
      ],
    },
  ]);

  await dicRepo.save(dic);
  console.log('end');
}

main();
