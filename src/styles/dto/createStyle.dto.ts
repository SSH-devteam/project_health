import { Injectable, UsePipes, ValidationPipe } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";

@Injectable()
// @UsePipes(ValidationPipe)
export class CreateStyleDto {

    @IsString()
    @IsNotEmpty()
    name:string;

}
