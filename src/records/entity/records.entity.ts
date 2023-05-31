import { Matches } from 'class-validator';
import { RecordDetail } from 'src/records-detail/entity/records-detail.entity';
import { User } from 'src/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
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
  record:string;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @ManyToOne((type) => User, (user) => user.records, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany((type) => RecordDetail, (recordDetail) => recordDetail.record, {
    nullable: false,
    eager: true,
  })
  recordDetails: RecordDetail[];
}
