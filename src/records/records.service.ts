import { Injectable, NotFoundException } from '@nestjs/common';
import { Record } from './entity/records.entity';
import { RecordsRepository } from './records.repository';
import { CreateRecordDto } from './dto/createRecord.dto';
import { getDateTime } from 'src/getDateTime';
import { UpdateRecordDto } from './dto/updateRecord.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class RecordsService {
    constructor(private recordsRepository:RecordsRepository) {}

    async getRecordById(id:number): Promise<Record> {
        const record = await this.recordsRepository.findOne({where:{id}});
        return record
    }
    
    async createRecord(createRecordDto:CreateRecordDto):Promise<Record> {
        const record = await this.recordsRepository.createRecord(createRecordDto);
        return record
    }
      
    // TO DO CreateRecordDto 와 updateRecordDto 구분 ??
    async updateRecord(id:number,updateRecordDto:UpdateRecordDto):Promise<UpdateResult> {
        const updated_at = getDateTime();
        const result = await this.recordsRepository.update(id,{...updateRecordDto,updated_at});

        if ( result.affected === 0 ) {
            throw new NotFoundException(`Record id with ${id} doesn't exist`)
        }

        return result
    }
    
      
    async deleteRecord(id:number):Promise<DeleteResult> {
        const result = await this.recordsRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`record id with ${id} doesn't exist`)
        }

        return result
    }
}
