import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { ExerciseTool } from '../entities/exercise.entity';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ExerciseTool)
  @IsNotEmpty()
  tool: ExerciseTool;

  @IsString()
  @IsNotEmpty()
  mainTarget: string;

  @IsString()
  @IsNotEmpty()
  subTarget: string;
}
