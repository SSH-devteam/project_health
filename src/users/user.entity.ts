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
import { Record } from 'src/exercise_records/exercise_records.entity';

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

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: true,
  })
  username: string;

  @Column({
    nullable: true,
  })
  usersex: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  ageRange: string;

  @Column({
    type: 'float',
    nullable: true,
  })
  weight: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  height: number;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @Column()
  @OneToMany((type) => Record, (record) => record.user)
  records: Record[];
}
