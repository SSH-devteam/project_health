import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecordsService } from './records.service';
import { GetUser } from 'src/users/getUserDecorator';
import { User } from 'src/users/entity/user.entity';

@Controller('records')
@UseGuards(AuthGuard())
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Get('/:id')
  getRecord(@Param() id:number) {
    return this.recordsService.findOne(id);
  }

  @Post('/')
  createRecords() {}
}
