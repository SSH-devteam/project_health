import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecordsService } from './records.service';
import { GetUser } from 'src/users/getUserDecorator';
import { User } from 'src/users/entity/user.entity';

@Controller('records')
@UseGuards(AuthGuard())
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @Get('/')
  getRecord(@GetUser() user: User) {
    console.log(user);
    console.log('access');
    return 'accesstoken is working';
  }

  @Post('/')
  createRecords() {}
}
