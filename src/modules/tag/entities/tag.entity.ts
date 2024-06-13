import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TagGroupEntity } from './tag-group.entity';

@Entity({ name: 'tag' })
export class TagEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

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
  en: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  ru: string;

  @ManyToOne(() => TagGroupEntity, (tagGroup) => tagGroup.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'tagGroupId',
    referencedColumnName: 'id',
  })
  tagGroup: TagGroupEntity;

  @Column({
    type: 'uuid',
  })
  tagGroupId: string;
}
