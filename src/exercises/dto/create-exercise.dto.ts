import { IsEnum, IsNotEmpty, IsString, Length } from "class-validator";
import { ExerciseTool } from "../exercise.enum";

export class CreateExerciseDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsEnum(ExerciseTool)
    @IsNotEmpty()
    tool:ExerciseTool

    @IsNotEmpty()
    mainTarget:string

    @IsNotEmpty()
    subTarget:string
}


// @Column()
//     name:string;

//     @Column()
//     tool:ExerciseTool;

//     @Column()
//     mainTarget:string

//     @Column()
//     subTarget:string

//     @Column()
//     createdAt:string

//     @Column()
//     updatedAt:string