import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

export class CreateRecordDto {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  exercise: number;

  @IsInt()
  @IsNotEmpty()
  setNum: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/\d+:\d+-/g, { message: '입력 형식이 잘못 됐습니다.' })
  workout: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, {
    message: '날짜 형식이 잘못 됐습니다',
  })
  start_time: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/, {
    message: '날짜 형식이 잘못 됐습니다',
  })
  end_time: string;
}
