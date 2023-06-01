import { DataSource, Repository } from "typeorm";
import { Record } from "./entity/records.entity";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { RecordCredentialDto } from "./dto/recordCredential.dto";
import { getDateTime } from "src/getDateTime";

@Injectable()
export class RecordsRepository extends Repository<Record> {
    constructor(private datasource:DataSource) {
        super(Record,datasource.createEntityManager());
    }

    async createRecord(recordCredentialDto:RecordCredentialDto) {
        // const { userId, exercise, workout ,start_time, end_time} = recordCredentialDto;
        const { exercise, workout ,start_time, end_time} = recordCredentialDto;
        const record = this.create({
            // userId,
            exercise,
            workout,
            start_time,
            end_time,
            created_at:getDateTime(),
            updated_at:getDateTime()
        })

        try {
            await this.save(record);
            return record
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }

}