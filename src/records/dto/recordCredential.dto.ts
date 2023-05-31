import { IsInt, IsNotEmpty, IsString, Matches, Max, Min } from 'class-validator';

export class RecordCredentialDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  exercise:number;

  @IsString()
  @IsNotEmpty()
  @Matches(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, {
    message: '날짜 형식이 잘못 됐습니다',
  })
  start_time: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/\d+:\d+-/g,{message:"입력 형식이 잘못 됐습니다."})
  record: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, {
    message: '날짜 형식이 잘못 됐습니다',
  })
  end_time: string;

}

// @Entity()
// export class Records extends BaseEntity {
//   @PrimaryGeneratedColumn('increment')
//   id: number;

//   @Column()
//   userId: number;

//   @Column()
//   startTime: string;

//   @Column()
//   end_time: string;

//   @ManyToOne((type) => User, (user) => user.records, {
//     nullable: true,
//     onDelete: 'CASCADE',
//   })
//   user: User;
// }
