import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecordsService } from './records.service';

@Controller('records')
@UseGuards(AuthGuard())
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Get('/')
  getRecord() {
    console.log('access');
    return 'accesstoken is working';
  }
}
