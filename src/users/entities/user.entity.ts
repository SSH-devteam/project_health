import { timestamp } from "rxjs";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn,Timestamp,UpdateDateColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({
        type : "varchar",
        length: 150,
        unique:true
    })
    name: string;

    @Column({
        type:"int4range",
        nullable:true,
    })
    age : number;

    @Column({
        type:"int4range",
        nullable:true,
    })
    weight : number;

    @Column({
        type:"int4range",
        nullable:true,
    })
    height : number;

    @CreateDateColumn({
        type:"timestamp",
        nullable:true,
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt:Date | null;

    @UpdateDateColumn({
        type:"timestamp",
        nullable:true,
        default: () => "CURRENT_TIMESTAMP"
    })
    updatedAt:Date | null;
    
}