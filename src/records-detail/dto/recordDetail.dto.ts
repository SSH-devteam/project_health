import { IsInt, IsString, Matches } from 'class-validator';
import { Column } from 'typeorm';

export class RecordDetailDto {
  @Column()
  @IsInt()
  sets: number;

  @IsString()
  @Matches(/^[0-9\-]*$/)
  weights: string;

  @IsString()
  @Matches(/^[0-9\-]*$/)
  reps: string;
}

// @Entity()
// export class RecordDetail extends BaseEntity {
//   @PrimaryGeneratedColumn('increment')
//   id: number;

//   @Column()
//   @IsInt()
//   sets: number;

//   @Column()
//   weights: string;

//   @Column()
//   reps: string;

//   @ManyToOne((type) => Record, (record) => record.recordDetails, {
//     nullable: true,
//     onDelete: 'CASCADE',
//     eager: false,
//   })
//   record: Record;
// }
