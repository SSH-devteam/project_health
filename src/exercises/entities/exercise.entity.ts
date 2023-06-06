import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exercise extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    name:string;

    @Column()
    tool:string;

    @Column()
    mainTarget:string

    @Column()
    subTarget:string

    @Column()
    createdAt:string

    @Column()
    updatedAt:string
}
