import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class AuthCredentialDto {
  @IsNumber()
  @IsNotEmpty()
  kakaoId: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
