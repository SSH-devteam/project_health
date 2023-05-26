import { Matches } from 'class-validator';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Records extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @Column()
  startTime: string;

  @Column()
  end_time: string;

  @ManyToOne((type) => User, (user) => user.records, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
