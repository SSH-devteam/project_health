import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { UserRepository } from './users/user.repository';
import { ExerciseRecordsService } from './exercise_records/exercise_records.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule],
  providers: [ExerciseRecordsService],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
