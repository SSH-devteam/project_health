import { timestamp } from 'rxjs';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  RoleSpecification,
  Unique,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Records } from 'src/exercise_records/records.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ type: 'bigint' })
  // @IsNumber({
  //   allowInfinity: true,
  // })
  @IsNotEmpty()
  kakaoId: number;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: true })
  username: string;

  @Column({ nullable: true })
  usersex: string;

  @Column({ type: 'varchar', nullable: true })
  ageRange: string;

  @Column({ type: 'float', nullable: true })
  weight: number;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @OneToMany((type) => Records, (record) => record.user)
  records: Records[];
}
