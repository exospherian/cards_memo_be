import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { AuthEntity } from '../../auth/entities';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  lang: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  defaultFrom?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  defaultTo?: string;

  @OneToMany(() => AuthEntity, (auth) => auth.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  auth: AuthEntity[];
}
