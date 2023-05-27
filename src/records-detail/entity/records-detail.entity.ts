import { IsInt, Matches } from 'class-validator';
import { Record } from 'src/records/entity/records.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RecordDetail extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @IsInt()
  setNum: number;

  @Column()
  weights: string;

  @Column()
  repNum: string;

  @ManyToOne((type) => Record, (record) => record.recordDetails, {
    nullable: true,
    onDelete: 'CASCADE',
    eager: false,
  })
  record: Record;
}
