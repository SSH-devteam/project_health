import { Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  @Matches(/^[a-zA-Z0-9]/, {
    message: 'username must be composed with English and Number',
  })
  readonly username: string;

  readonly usersex: string;

  @IsString()
  readonly ageRange: string;

  @IsInt()
  @Min(0)
  @Max(200)
  readonly weight: number;

  @IsInt()
  @Min(0)
  @Max(300)
  readonly height: number;

  //   @IsOptional()
  //   @IsDate()
  //   readonly createdAt: Date;

  //   @IsOptional()
  //   @IsDateString()
  //   readonly updatedAt: string;
  // @IsInt({each:true})
  // readonly style_id:number[];
}
