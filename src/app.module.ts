import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { RecordsModule } from './records/records.module';
import { StylesModule } from './styles/styles.module';
import { ExercisesModule } from './exercises/exercises.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        UsersModule,
        RecordsModule,
        StylesModule,
        ExercisesModule,
    ],
})
export class AppModule {}
