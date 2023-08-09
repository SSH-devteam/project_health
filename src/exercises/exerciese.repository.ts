import { DataSource, Repository, UpdateResult } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { getDateTime } from 'src/getDateTime';
import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExerciseRepository extends Repository<Exercise> {
    constructor(private dataSource: DataSource) {
        super(Exercise, dataSource.createEntityManager());
    }

    async createExercise(
        createExerciseDto: CreateExerciseDto,
    ): Promise<Exercise> {
        const { name, tool, mainTarget, subTarget } = createExerciseDto;
        const exercise = this.create({
            name: name,
            tool: tool,
            mainTarget,
            subTarget,
            createdAt: getDateTime(),
            updatedAt: getDateTime(),
        });

        console.log(exercise);

        try {
            await this.save(exercise);
            return exercise;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateExercise(
        id: number,
        updateExerciseDto: UpdateExerciseDto,
    ): Promise<UpdateResult> {
        const { name, tool, mainTarget, subTarget } = updateExerciseDto;

        const updateResult = await this.update(id, {
            name,
            tool: tool,
            mainTarget,
            subTarget,
            updatedAt: getDateTime(),
        });
        if (updateResult.affected === 0) {
            throw new NotFoundException();
        }
        return updateResult;
    }
}
