import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Record } from 'src/records/entity/records.entity';
import { Styles } from 'src/styles/entities/style.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  // @IsEmail()
  // @IsNotEmpty()
  email: string;

  @Column({ type: 'bigint' })
  // @IsNumber({
  //   allowInfinity: true,
  // })
  // @IsNotEmpty()
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

  @OneToMany((type) => Record, (record) => record.user,{eager:true})
  records: Record[];

  // @OneToMany((type) => Styles, (styles) => styles.user,{eager:true})
  // styles:Styles[];
}
