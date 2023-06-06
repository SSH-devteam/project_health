import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ExerciseTool } from "../exercise.enum";

@Entity()
export class Exercise extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id:number

    @Column()
    name:string;

    @Column()
    tool:ExerciseTool;

    @Column()
    mainTarget:string

    @Column()
    subTarget:string

    @Column()
    createdAt:string

    @Column()
    updatedAt:string
}
