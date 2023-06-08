import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExerciseRepository } from './exerciese.repository';
import { Exercise } from './entities/exercise.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class ExercisesService {
  constructor(private exercieseRepository:ExerciseRepository){}

  async createExercise(createExerciseDto: CreateExerciseDto) {
    return await this.exercieseRepository.createExercise(createExerciseDto);
  }

  async getAllExercises():Promise<Exercise[]> {
    const exercieses:Exercise[] = await this.exercieseRepository.find();
    return exercieses
  }

  async getOneExercise(id: number):Promise<Exercise> {
    const exercise:Exercise = await this.exercieseRepository.findOneBy({id});
    if (!exercise) {
      throw new NotFoundException(`exercise with ${id} does not exist`)
    }
    return exercise
  }

  async updateExercise(id: number, updateExerciseDto: UpdateExerciseDto):Promise<UpdateResult> {
    return this.exercieseRepository.updateExercise(id,updateExerciseDto);
  }

  deleteExercise(id: number):Promise<DeleteResult> {
    return this.exercieseRepository.delete(id);
  }
}
