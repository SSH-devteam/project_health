import { Module } from '@nestjs/common';
import { RecordsDetailService } from './records-detail.service';
import { RecordsDetailController } from './records-detail.controller';

@Module({
  controllers: [RecordsDetailController],
  providers: [RecordsDetailService]
})
export class RecordsDetailModule {}
