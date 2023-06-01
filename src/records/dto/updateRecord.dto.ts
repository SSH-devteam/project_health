import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsString, Matches, Max, Min } from 'class-validator';
import { CreateRecordDto } from './createRecord.dto';

export class UpdateRecordDto extends PartialType(CreateRecordDto){

}
