import { type } from "os";
import { User } from "src/users/entity/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToOne((type) => User, (user) => user.character )
    user:User


}

