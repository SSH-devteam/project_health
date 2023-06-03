import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { Record } from './entity/records.entity';
import { RecordsRepository } from './records.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  controllers: [RecordsController],
  providers: [RecordsService,RecordsRepository],
})
export class RecordsModule {}
