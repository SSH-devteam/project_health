import { DataSource, Repository, UpdateDateColumn } from "typeorm";
import { Record } from "./entity/records.entity";
import { Injectable, InternalServerErrorException, ParseIntPipe } from "@nestjs/common";
import { getDateTime } from "src/getDateTime";
import { CreateRecordDto } from "./dto/createRecord.dto";
import { User } from "src/users/entity/user.entity";

@Injectable()
export class RecordsRepository extends Repository<Record> {
    constructor(private datasource:DataSource) {
        super(Record,datasource.createEntityManager());
    }

    async createRecord(createRecordDto:CreateRecordDto,user:User) {
        // const { userId, exercise, workout ,start_time, end_time} = recordCredentialDto;
        const { exercise, setNum, workout ,start_time, end_time} = createRecordDto;
        const works = workout.split("-");
        const weights = [];
        const reps = [];
        
        for (let i = 0 ; i < setNum ; i++) {
            const [weight,rep] = works[i].split(":");
            weights.push(+weight);
            reps.push(+rep);
        }
        const userId = user.id;
        const record = this.create({
            userId,
            exercise,
            setNum,
            weights,
            reps,
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