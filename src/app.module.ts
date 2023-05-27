import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { UserRepository } from './users/user.repository';
import { RecordsModule } from './records/records.module';
import { RecordsDetailModule } from './records-detail/records-detail.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, RecordsModule, RecordsDetailModule],
  // providers: [RecordsService],
  // controllers: [ExerciseRecordsController],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
