import { Matches } from 'class-validator';
import { type } from 'os';
import { User } from 'src/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  IntegerType,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Record extends BaseEntity {
  
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @Column()
  exercise:number;

  @Column()
  workout:string;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;

  @ManyToOne((type) => User, (user) => user.records, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user: User;

}
