import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { AuthGuard } from '@nestjs/passport';
import { Exercise } from './entities/exercise.entity';

@Controller('exercises')
@UsePipes(ValidationPipe)
@UseGuards(AuthGuard('jwt'))
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.createExercise(createExerciseDto);
  }

  @Get()
  findAll() {
    return this.exercisesService.getAllExercises();
  }

  @Get(':id')
  findOne(@Param('id') id: number):Promise<Exercise> {
    return this.exercisesService.getOneExercise(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateExerciseDto: UpdateExerciseDto) {
    return this.exercisesService.updateExercise(id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.exercisesService.deleteExercise(id);
  }
}
