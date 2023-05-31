import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
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

  @Patch('/:id')
  updateRecord() {}

  @Delete('/:id')
  deleteRecord() {}


}
