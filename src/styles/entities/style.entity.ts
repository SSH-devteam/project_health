import { type } from "os";
import { User } from "src/users/entity/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Style extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    name:string;

    @ManyToOne((type) => User,(user) => user.styles )
    user: User;
    
}
