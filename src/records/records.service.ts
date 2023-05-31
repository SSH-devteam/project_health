import { Injectable } from '@nestjs/common';
import { Record } from './entity/records.entity';
import { RecordsRepository } from './records.repository';
import { RecordCredentialDto } from './dto/recordCredential.dto';

@Injectable()
export class RecordsService {
    constructor(private recordsRepository:RecordsRepository) {}

    async getRecord(id:number): Promise<Record> {
        const record = await this.recordsRepository.findOne({where:{id}});
        return record
    }
    
    async createRecords(recordCredentialDto:RecordCredentialDto) {
        return await this.recordsRepository.createRecord(recordCredentialDto);
    }
    
      
    async updateRecord() {}
    
      
    async deleteRecord() {}
}
