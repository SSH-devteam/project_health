import { DataSource, Repository } from "typeorm";
import { Record } from "./entity/records.entity";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { RecordCredentialDto } from "./dto/recordCredential.dto";
import { Time } from "src/getDateTime";
import { time } from "console";

@Injectable()
export class RecordsRepository extends Repository<Record> {
    constructor(private datasource:DataSource) {
        super(Record,datasource.createEntityManager());
    }

    async createRecord(recordCredentialDto:RecordCredentialDto) {
        const { userId, exercise, workout ,start_time, end_time} = recordCredentialDto;
        const timeFunc = new Time;

        const record = this.create({
            userId,
            exercise,
            workout,
            start_time,
            end_time,
            created_at:timeFunc.getDateTime(),
            updated_at:timeFunc.getDateTime()
        })

        try {
            await this.save(record);
            console.log(record)
            return record
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }

}