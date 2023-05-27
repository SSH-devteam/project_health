import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { Record } from './entity/records.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), UsersModule],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
