import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TagEntity } from './tag.entity';

@Entity({ name: 'tagGroup' })
export class TagGroupEntity {
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

  @OneToMany(() => TagEntity, (tag) => tag.tagGroup, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  tags: TagEntity[];
}
