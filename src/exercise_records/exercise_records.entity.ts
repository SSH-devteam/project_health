import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Record extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @ManyToOne((type) => User, (user) => user.records)
  user: User;
}
