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
import { PublicWordEntity } from './public-word.entity';

@Entity({ name: 'publicDictionary' })
export class PublicDictionaryEntity {
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
    type: 'int',
    default: 0,
  })
  countOfDownload: number;

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

  @Column({
    type: 'uuid',
    nullable: true,
    unique: true,
  })
  dictionaryId: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  updateExist?: boolean;

  @OneToMany(() => PublicWordEntity, (word) => word.dictionary, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  words: PublicWordEntity[];

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  userId: string;
}
