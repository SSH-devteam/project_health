import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { AuthGuard } from '@nestjs/passport';
import { Exercise } from './entities/exercise.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('exercises')
@UsePipes(ValidationPipe)
@UseGuards(AuthGuard('jwt'))
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto):Promise<Exercise> {
    return this.exercisesService.createExercise(createExerciseDto);
  }

  @Get()
  findAll():Promise<Exercise[]> {
    return this.exercisesService.getAllExercises();
  }

  @Get(':id')
  findOne(@Param('id') id: number):Promise<Exercise> {
    return this.exercisesService.getOneExercise(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateExerciseDto: UpdateExerciseDto):Promise<UpdateResult> {
    return this.exercisesService.updateExercise(id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number):Promise<DeleteResult> {
    return this.exercisesService.deleteExercise(id);
  }
}
