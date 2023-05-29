import { Injectable } from '@nestjs/common';
import { Record } from './entity/records.entity';
import { RecordsRepository } from './records.repository';

@Injectable()
export class RecordsService {
    constructor(private recordsRepository:RecordsRepository) {}

    async findOne(id:number): Promise<any> {
        return this.recordsRepository.findOne({where:{id}});
    }
}
