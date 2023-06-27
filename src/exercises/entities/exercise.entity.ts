import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  tool: ExerciseTool;

  @Column()
  mainTarget: string;

  @Column()
  subTarget: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}

export enum ExerciseTool {
  '바벨',
  '덤벨',
  '머신',
  '맨몸',
}
