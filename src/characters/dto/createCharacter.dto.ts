import { IsNotEmpty, IsString } from "class-validator"

export class CreateCharacterDto {

    @IsNotEmpty()
    @IsString()
    stats:string

    @IsNotEmpty()
    @IsString()
    items:string


}
