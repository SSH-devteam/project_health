import { DataSource, Repository } from "typeorm";
import { Exercise } from "./entities/exercise.entity";
import { CreateExerciseDto } from "./dto/create-exercise.dto";
import { getDateTime } from "src/getDateTime";
import { Injectable, InternalServerErrorException } from "@nestjs/common";


@Injectable()
export class ExerciseRepository extends Repository<Exercise> {
    constructor(private dataSource:DataSource){
        super(Exercise,dataSource.createEntityManager())
    }

    async createExercise(createExerciseDto:CreateExerciseDto) {
        const { name, tool, mainTarget, subTarget } = createExerciseDto;
        const exercise = this.create({
            name,
            tool,
            mainTarget,
            subTarget,
            createdAt:getDateTime(),
            updatedAt:getDateTime()
        })

        try {
            await this.save(exercise)
            return exercise
        } catch(error) {
            throw new InternalServerErrorException(error);
        }
    }
}