import { User } from "src/users/entity/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Styles extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    name:string;

    @Column()
    created_at: string;

    @Column()
    updated_at: string;

    // @ManyToOne((type) => User,(user) => user.styles,{eager:false} )
    // user: User;


}
