import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Column } from 'typeorm';

export class AuthKakaoDto {
  @IsNotEmpty()
  @Column({ type: 'bigint' })
  kakaoId: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
