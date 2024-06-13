import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { PublicDictionaryEntity } from './public-dictionary.entity';

@Entity({ name: 'publicWord' })
export class PublicWordEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 510,
    nullable: false,
  })
  from: string;

  @Column({
    type: 'varchar',
    length: 510,
    nullable: false,
  })
  to: string;

  @Column({
    type: 'int',
    default: 0,
  })
  order: number;

  @Column({
    type: 'varchar',
    length: 510,
    nullable: true,
  })
  transcription: string;

  @Column({
    type: 'varchar',
    length: 510,
    nullable: true,
  })
  description: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    nullable: false,
  })
  created: string;

  @ManyToOne(() => PublicDictionaryEntity, (dictionary) => dictionary.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'dictionaryId',
    referencedColumnName: 'id',
  })
  dictionary: PublicDictionaryEntity;

  @Index()
  @Column({
    type: 'uuid',
  })
  dictionaryId: string;
}
