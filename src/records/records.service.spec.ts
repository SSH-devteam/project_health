import { User } from "src/users/entity/user.entity";
import { Record } from "./entity/records.entity";
import { RecordsRepository } from "./records.repository";
import { RecordsService } from "./records.service";
import { CreateRecordDto } from "./dto/createRecord.dto";
import { Test, TestingModule } from "@nestjs/testing";
import exp from "constants";
import { NotFoundException } from "@nestjs/common";
import { DeleteResult, UpdateResult } from "typeorm";
import { UpdateRecordDto } from "./dto/updateRecord.dto";

describe('RecordService', () => {
  let recordService: RecordsService;
  let recordRepository: RecordsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecordsService,
        {
          provide: RecordsRepository,
          useValue: {
            findOneBy: jest.fn(),
            createRecord: jest.fn(),
            save: jest.fn(),
            delete:jest.fn(),
            update:jest.fn()
          },
        },
      ],
    }).compile();

    recordService = module.get<RecordsService>(RecordsService);
    recordRepository = module.get<RecordsRepository>(RecordsRepository);
  });

  const record = {
    "id": 28,
    "userId": 1,
    "exercise": 1,
    "setNum": 2,
    "weights": [30,20],
    "reps": [10,20],
    "start_time": "2023-06-01 00:50:59",
    "end_time": "2023-06-01 01:30:59",
    "created_at": "2023-06-10 02:45:46",
    "updated_at": "2023-06-10 02:45:46"
    };

  describe('createRecord', () => {
    it('should create a new record', async () => {
        const dto = {
            "exercise": 1,
            "setNum": 2,
            "workout":"30:10-20:20",
            "start_time": "2023-06-01 00:50:59",
            "end_time": "2023-06-01 01:30:59",
            "created_at": "2023-06-10 02:45:46",
            "updated_at": "2023-06-10 02:45:46"
        }
        const user = {id:1};

        const createRecordSpy = jest
        .spyOn(recordRepository,"createRecord")
        .mockResolvedValue(record as Record)

        const result = await recordService.createRecord(dto as CreateRecordDto,user as User)
        expect(result).toEqual(record)
    })
  })

  describe('getRecordById', () => {
    it('should return record', async () => {

    const getRecordByIdSpy = jest
    .spyOn(recordRepository,'findOneBy')
    .mockResolvedValue(record as Record)

    const id = 28;

    const foundRecord = await recordService.getRecordById(id)
    expect(foundRecord).toEqual(record)
    expect(getRecordByIdSpy).toHaveBeenCalledWith({id})
    })

    it('should throw NotFoundException', async () => {
    
      const getRecordByIdSpy = jest
      .spyOn(recordRepository,'findOneBy')
      .mockResolvedValue(null)

      const id = -1 ;
      
      try {
        const result = await recordService.getRecordById(id)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
        expect(getRecordByIdSpy).toHaveBeenCalledWith({id})
      }
    })
    
  })

  describe('deleterRecord', () => {

    it('should return deleteResult', async () => {

        const id = 28;

        const deleteResult = {
            affected:1
        } as DeleteResult


        const deleteSpy = jest
        .spyOn(recordRepository,'delete')
        .mockResolvedValue(deleteResult)

        const result = await recordRepository.delete(id)
        expect(result.affected).toEqual(deleteResult.affected)
        expect(deleteSpy).toHaveBeenCalledWith(id)
    })

    it('should return affected === 0', async () => {

      const id = 28;

        const deleteResult = {
            affected:0
        } as DeleteResult


        const deleteSpy = jest
        .spyOn(recordRepository,'delete')
        .mockResolvedValue(deleteResult)

        try {
          const result = await recordRepository.delete(id)
        } catch (error) {
          expect(error).toBeInstanceOf(NotFoundException)
        }
        expect(deleteSpy).toHaveBeenCalledWith(id)
    })
  })

  describe('updateRecord', () => {

    const updateData = { exercise: 17 ,updated_at:"2023-06-15 14:04:50"}
    const id = 28;

    it('should return update result', async () => {
      const updateResult = {
        affected:1
      }
      
      const updateSpy = jest
      .spyOn(recordRepository,'update')
      .mockResolvedValue(updateResult as UpdateResult)

      const result = await recordRepository.update(id,updateData as UpdateRecordDto)

      expect(result.affected).toEqual(updateResult.affected)
      expect(updateSpy).toHaveBeenCalledWith(id,updateData)
    
    })

    it('should throw NotFoundException', async () => {
      const updateResult = {
        affected:0
      }
      
      const updateSpy = jest
      .spyOn(recordRepository,'update')
      .mockResolvedValue(updateResult as UpdateResult)
      
      try {
        const result = await recordRepository.update(id,updateData as UpdateRecordDto)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
      expect(updateSpy).toHaveBeenCalledWith(id,updateData)
    
    })
  })
})          