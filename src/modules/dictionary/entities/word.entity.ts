import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { UserEntity } from '../../user/entities';
import { DictionaryEntity } from './dictionary.entity';

@Entity({ name: 'word' })
export class WordEntity {
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

  @Column({
    type: 'int',
    default: 0,
  })
  globalProgress: number;

  @Column({
    type: 'int',
    default: 0,
  })
  localProgress: number;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    nullable: false,
  })
  created: string;

  @ManyToOne(() => DictionaryEntity, (dictionary) => dictionary.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'dictionaryId',
    referencedColumnName: 'id',
  })
  dictionary: DictionaryEntity;

  @Index()
  @Column({
    type: 'uuid',
  })
  dictionaryId: string;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @Column({
    type: 'uuid',
  })
  userId: string;
}
