import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Character {

    @PrimaryGeneratedColumn('increment')
    id:number
}

