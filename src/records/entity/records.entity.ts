import { Matches } from 'class-validator';
import { type } from 'os';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { User } from 'src/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  IntegerType,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @ManyToOne((type) => User, (user) => user.records, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user: User;

}
