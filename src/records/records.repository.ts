import { DataSource, Repository } from "typeorm";
import { Record } from "./entity/records.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RecordsRepository extends Repository<Record> {
    constructor(private datasource:DataSource) {
        super(Record,datasource.createEntityManager());
    }

}