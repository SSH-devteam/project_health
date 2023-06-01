import { Injectable, NotFoundException } from '@nestjs/common';
import { Record } from './entity/records.entity';
import { RecordsRepository } from './records.repository';
import { RecordCredentialDto } from './dto/recordCredential.dto';

@Injectable()
export class RecordsService {
    constructor(private recordsRepository:RecordsRepository) {}

    async getRecordById(id:number): Promise<Record> {
        const record = await this.recordsRepository.findOne({where:{id}});
        return record
    }
    
    async createRecord(recordCredentialDto:RecordCredentialDto) {
        const record = await this.recordsRepository.createRecord(recordCredentialDto);
        return record
    }
      
    async updateRecord() {}
    
      
    async deleteRecord(id:number) {
        const result = await this.recordsRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`record id with ${id} doesn't exist`)
        }

        return result.affected
    }
}
