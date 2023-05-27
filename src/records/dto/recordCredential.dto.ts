import { IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';

export class RecordCredential {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, {
    message: '날짜 형식은 XXXX-XX-XX XX:XX:XX 여야 합니다',
  })
  start_time: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, {
    message: '날짜 형식은 XXXX-XX-XX XX:XX:XX 여야 합니다',
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
