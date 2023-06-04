import { DataSource, Repository } from "typeorm";
import { Styles } from "./entities/style.entity";

export class stylesRepository extends Repository<Style> {
    constructor(private dataSource:DataSource ) {
        super(Styles,dataSource.createEntityManager())
    }
}