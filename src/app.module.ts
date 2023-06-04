import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { RecordsModule } from './records/records.module';
import { StylesModule } from './styles/styles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    RecordsModule,
    StylesModule
  ],
  // providers: [RecordsService],
  // controllers: [ExerciseRecordsController],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
