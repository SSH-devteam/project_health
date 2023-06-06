import { DataSource, Repository } from "typeorm";
import { Exercise } from "./entities/exercise.entity";


export class ExerciseRepository extends Repository<Exercise> {
    constructor(private dataSource:DataSource){
        super(Exercise,dataSource.createEntityManager())
    }
}