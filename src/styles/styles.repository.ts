import { DataSource, Repository } from "typeorm";
import { Styles } from "./entities/style.entity";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateStyleDto } from "./dto/createStyle.dto";
import { getDateTime } from "src/getDateTime";
import { User } from "src/users/entity/user.entity";

@Injectable()
export class StylesRepository extends Repository<Styles> {
    constructor(private dataSource:DataSource ) {
        super(Styles,dataSource.createEntityManager())
    }

    async createStyle(createStyleDto:CreateStyleDto,user:User):Promise<Styles> {
        const { name } = createStyleDto;
        const found = await this.findOneBy({name});
        
        if (found) {
            throw new InternalServerErrorException(`style with name: ${name} alredy exists`);
        }

        const style = await this.create({
            name,
            created_at:getDateTime(),
            updated_at:getDateTime()
        })

        try {
            await this.save(style);
            console.log(style);
            return style;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
        


    }
}