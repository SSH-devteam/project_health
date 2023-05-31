import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecordsService } from './records.service';
import { GetUser } from 'src/users/getUserDecorator';
import { User } from 'src/users/entity/user.entity';
import { RecordCredentialDto } from './dto/recordCredential.dto';
import { Record } from './entity/records.entity';

@Controller('records')
// @UseGuards(AuthGuard())
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Get('/:id')
  getRecord(@Param() id:number): Promise<Record> {
    return this.recordsService.getRecordById(id);
  }

  @Post('/')
  createRecords(@Body(ValidationPipe) recordCredentialDto:RecordCredentialDto):Promise<Record> {
    return this.recordsService.createRecord(recordCredentialDto);
  }

  @Patch('/:id')
  updateRecord() {}

  @Delete('/:id')
  deleteRecord(@Param() id:number) {
    return this.recordsService.deleteRecord(id);
  }


}
