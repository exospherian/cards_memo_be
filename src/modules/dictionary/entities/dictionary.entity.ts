import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities';
import { WordEntity } from './word.entity';

@Entity({ name: 'dictionary' })
export class DictionaryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  from: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  to: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'int',
    array: true,
    nullable: true,
  })
  tags?: number[];

  @Column({
    type: 'uuid',
    nullable: true,
    unique: true,
  })
  childPublicDictionaryId?: string;

  @Column({
    type: 'timestamp without time zone',
    nullable: true,
  })
  lastPublishTime?: string;

  @Column({
    type: 'uuid',
    nullable: true,
    unique: true,
  })
  publicDictionaryId?: string;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  updateExist?: boolean;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  shareUserId: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    nullable: false,
  })
  created: string;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    nullable: false,
  })
  updated: string;

  @OneToMany(() => WordEntity, (word) => word.dictionary, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  words: WordEntity[];

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
