import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Character {

    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    userId:number

    @Column()
    stats:number[]

    @Column()
    items:string[]

    @Column()
    createdAt:string

    @Column()
    updatedAt:string

}

