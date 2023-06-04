import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecordsService } from './records.service';
import { GetUser } from 'src/users/getUserDecorator';
import { User } from 'src/users/entity/user.entity';
import { Record } from './entity/records.entity';
import { CreateRecordDto } from './dto/createRecord.dto';
import { UpdateRecordDto } from './dto/updateRecord.dto';

@Controller('records')
@UseGuards(AuthGuard('jwt'))
@UsePipes(ValidationPipe)
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Get('/:id')
  getRecord(@Param('id') id:number): Promise<Record> {
    return this.recordsService.getRecordById(id);
  }

  @Post('/')
  createRecords(
    @Body(ValidationPipe) createRecordDto:CreateRecordDto,
    @GetUser() user:User
  ):Promise<Record> {
    console.log(user)
    return this.recordsService.createRecord(createRecordDto,user);
  }

  @Patch('/:id')
  updateRecord(@Param() id:number,@Body(ValidationPipe) updateRecordDto:UpdateRecordDto) {
    return this.recordsService.updateRecord(id,updateRecordDto);
  }

  @Delete('/:id')
  deleteRecord(@Param() id:number) {
    return this.recordsService.deleteRecord(id);
  }


}
