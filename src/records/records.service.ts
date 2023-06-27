import { Injectable, NotFoundException } from '@nestjs/common';
import { Record } from './entity/records.entity';
import { RecordsRepository } from './records.repository';
import { CreateRecordDto } from './dto/createRecord.dto';
import { getDateTime } from 'src/getDateTime';
import { UpdateRecordDto } from './dto/updateRecord.dto';
import { DeleteResult, IntegerType, UpdateResult } from 'typeorm';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class RecordsService {
  constructor(private recordsRepository: RecordsRepository) {}

  async getRecordByUser(user: User): Promise<Record[]> {
    const records: Record[] = await this.recordsRepository.find({
      where: { userId: user.id },
    });
    if (records.length <= 0) {
      throw new NotFoundException('운동 기록이 없습니다');
    }
    return records;
  }

  async getRecordById(id: number): Promise<Record> {
    const record = await this.recordsRepository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException();
    }
    return record;
  }

  async getWeeklyInfo(user: User) {
    return await this.recordsRepository.getWeeklyInfo(user);
  }

  async createRecord(
    createRecordDto: CreateRecordDto,
    user: User,
  ): Promise<Record> {
    const record = await this.recordsRepository.createRecord(
      createRecordDto,
      user,
    );
    return record;
  }

  // TO DO CreateRecordDto 와 updateRecordDto 구분 ??
  async updateRecord(
    id: number,
    updateRecordDto: UpdateRecordDto,
  ): Promise<UpdateResult> {
    const updated_at = getDateTime();
    const result = await this.recordsRepository.update(id, {
      ...updateRecordDto,
      updated_at,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Record id with ${id} doesn't exist`);
    }

    return result;
  }

  async deleteRecord(id: number): Promise<DeleteResult> {
    const result = await this.recordsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`record id with ${id} doesn't exist`);
    }

    return result;
  }
}
