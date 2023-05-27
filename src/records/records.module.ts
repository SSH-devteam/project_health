import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Records } from './entity/records.entity';
import { UsersModule } from 'src/users/users.module';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

@Module({
  imports: [TypeOrmModule.forFeature([Records]), UsersModule],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
