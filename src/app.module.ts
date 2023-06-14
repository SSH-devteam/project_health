import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { RecordsModule } from './records/records.module';
import { StylesModule } from './styles/styles.module';
import { ExercisesModule } from './exercises/exercises.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    RecordsModule,
    StylesModule,
    ExercisesModule,
    StatisticsModule,
  ],
})
export class AppModule {}
