import { DataSource, QueryRunner, Repository, UpdateDateColumn } from "typeorm";
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

    async getWeeklyInfo(user:User){
        const queryRunner:QueryRunner = this.datasource.createQueryRunner();
        const query = 
        `SELECT EXERCISE."mainTarget" as "Target" , SUM(RECORD."setNum") as "Total Sets" FROM RECORD
        LEFT JOIN EXERCISE
        ON RECORD."exercise" = EXERCISE."id"
        WHERE
            DATE_PART('day', NOW()::DATE) - DATE_PART('day', RECORD."updated_at"::DATE) <= 7 
            AND RECORD."userId" = ${user.id}
        GROUP BY EXERCISE."mainTarget"`
        
        try {
            await queryRunner.connect();
            const result = await queryRunner.query(query);
            console.log("result",typeof(result),result)
            return result
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    
    }

}