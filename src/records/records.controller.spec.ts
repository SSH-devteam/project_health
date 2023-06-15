import { async } from "rxjs";
import { RecordsController } from "./records.controller"
import { RecordsService } from "./records.service";
import { Test, TestingModule } from "@nestjs/testing";
import { Record } from "./entity/records.entity";
import { User } from "src/users/entity/user.entity";
import { request } from "http";
import { CreateRecordDto } from "./dto/createRecord.dto";
import { UpdateRecordDto } from "./dto/updateRecord.dto";
import { DeleteResult, UpdateResult } from "typeorm";
import exp from "constants";



describe('RecordsController', () => {
    let recordController: RecordsController;
    let recordService: RecordsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers:[RecordsController],
            providers:[
                RecordsController,
                {
                    provide:RecordsService,
                    useValue:{
                        getRecordById:jest.fn() ,
                        getWeeklyInfo:jest.fn() ,
                        createRecord:jest.fn() ,
                        updateRecord:jest.fn() ,
                        deleteRecord:jest.fn() ,
                    }
                }

            ]
        }).compile();

        recordController = module.get<RecordsController>(RecordsController);
        recordService = module.get<RecordsService>(RecordsService);
    })

    describe('createRecords', () => {

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
        
        const user = {id:1};
        
        const dto = {
            "exercise": 1,
            "setNum": 2,
            "workout":"30:10-20:20",
            "start_time": "2023-06-01 00:50:59",
            "end_time": "2023-06-01 01:30:59",
            "created_at": "2023-06-10 02:45:46",
            "updated_at": "2023-06-10 02:45:46"
        }

        it('should return Record', async () => {

            const createRecordSpy = jest
            .spyOn(recordService,'createRecord')
            .mockResolvedValue(record as Record)

            const result = await recordController.createRecords(dto as CreateRecordDto,user as User);

            expect(result).toEqual(record)
            expect(createRecordSpy).toHaveBeenCalledWith(dto,user)

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
          .spyOn(recordService,'updateRecord')
          .mockResolvedValue(updateResult as UpdateResult)
    
          const result = await recordService.updateRecord(id,updateData as UpdateRecordDto)
    
          expect(result.affected).toEqual(updateResult.affected)
          expect(updateSpy).toHaveBeenCalledWith(id,updateData)
        
        })        
    })

    describe('getRecord', () => {

        const id = 28;
        
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

        it('should return record', async () => {

            const getRecordByIdSpy = jest
            .spyOn(recordService,'getRecordById')
            .mockResolvedValue(record as Record)

            const result = await recordController.getRecord(id)

            expect(result).toEqual(record)
            expect(getRecordByIdSpy).toHaveBeenCalledWith(id)

        })
    })

    describe('delete record', () => {
        it('should return delete result', async () => {
            const id = 28;
            const deleteResult = {affected:1}

            const deleteSpy = jest
            .spyOn(recordService,'deleteRecord')
            .mockResolvedValue(deleteResult as DeleteResult)

            const result = await recordController.deleteRecord(id)

            expect(result.affected).toEqual(deleteResult.affected)
            expect(deleteSpy).toHaveBeenCalledWith(id)

        })

    })

    describe('getWeeklyInfo', () => {

        it('should return weekly info ', async () => {
            const user = {id:1};
            
            const weeklyInfo = {
                "Target":"등",
                "Total Sets":20
            }

            const getWeeklyInfoSpy = jest
            .spyOn(recordService,'getWeeklyInfo')
            .mockResolvedValue(weeklyInfo)

            const result = await recordController.getWeeklyInfo(user as User)

            expect(result).toEqual(weeklyInfo)
            expect(getWeeklyInfoSpy).toHaveBeenCalledWith(user)

        })

    })
    

})