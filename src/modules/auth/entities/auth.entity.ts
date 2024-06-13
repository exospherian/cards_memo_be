import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AuthProvider } from '../../auth/interfaces';
import { UserEntity } from '../../user/entities';

@Entity({ name: 'auth' })
export class AuthEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
    cascade: true,
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

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: true,
  })
  email?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: true,
  })
  externalSub?: string;

  @Column({
    type: 'enum',
    enum: AuthProvider,
  })
  provider: AuthProvider;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  password?: string;
}
