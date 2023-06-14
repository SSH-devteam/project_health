import { RecordsRepository } from "./records.repository"
import { Test, TestingModule } from "@nestjs/testing";
import { DataSource, Not } from "typeorm";
import { Record } from "./entity/records.entity";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from "src/users/entity/user.entity";
import { UserRepository } from "src/users/user.repository";
import exp from "constants";
import { CreateRecordDto } from "./dto/createRecord.dto";

jest.mock('./records.repository');
const recordsRepository = require("./records.repository");

describe('RecordsRepository', () => {
    let recordsRepository: RecordsRepository;
    const datasource = {
        createEntityManager:jest.fn()
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RecordsRepository,
                {
                    provide:DataSource,
                    useValue:datasource
                }
            ]
        }).compile();

        recordsRepository = module.get<RecordsRepository>(RecordsRepository);
    })

    describe('findOneBy', () => {
        it('should return found record', async () => {
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
            
            const findOneSpy = jest 
            .spyOn(recordsRepository, 'findOneBy')
            .mockResolvedValue(record as Record);

            const foundRecord = await recordsRepository.findOneBy({id});
            expect(foundRecord).toEqual(record)
            expect(findOneSpy).toHaveBeenCalledWith({id})
        })

        it('should throw NotFoundException when record is not found', async () => {
            const id = 28;
      
            const findOneSpy = jest
            .spyOn(recordsRepository, 'findOneBy')
            .mockResolvedValue(null);
      
            try {
              await recordsRepository.findOneBy({ id });
            } catch (error) {
              expect(error).toBeInstanceOf(NotFoundException);
            }
      
            expect(findOneSpy).toHaveBeenCalledWith({ id });
          });
    })

    describe('getWeeklyInfo', () => {
        it('this should return total sets group by user and exercise', async () => {
            let user = new User();
            const tmp = {
                'id': 2,
                'email': 'zoash@naver.com',
                'kakaoId': 2822619430,
                'username': null,
                'usersex': null,
                'ageRange': null,
                'weight': null,
                'height': null,
                'createdAt': '2023-05-06 22:43:09',
                'updatedAt': '2023-05-06 22:43:09'
              }
            
            user.id = tmp.id;
            user.email = tmp.email ;
            user.kakaoId = tmp.kakaoId ;
            user.createdAt = tmp.createdAt ;
            user.updatedAt = tmp.updatedAt ;
            
            const result = [
                {
                    "Target": "가슴",
                    "Total Sets": "8"
                },
                {
                    "Target": "등",
                    "Total Sets": "12"
                }
            ]

            const getWeeklyInfoSpy = jest
            .spyOn(recordsRepository, 'getWeeklyInfo')
            .mockResolvedValue(result);

            const foundWeeklyInfo = await recordsRepository.getWeeklyInfo(user);
            expect(foundWeeklyInfo).toEqual(result)
            expect(getWeeklyInfoSpy).toHaveBeenCalledWith(user)
        
            
        })

        it('should throw NotFoundException', async () => {
            let user = new User();
            const tmp = {
                'id': 259,
                'email': 'zoash@naver.com',
                'kakaoId': 2822619430,
                'username': null,
                'usersex': null,
                'ageRange': null,
                'weight': null,
                'height': null,
                'createdAt': '2023-05-06 22:43:09',
                'updatedAt': '2023-05-06 22:43:09'
              }
            
            user.id = tmp.id;
            user.email = tmp.email ;
            user.kakaoId = tmp.kakaoId ;
            user.createdAt = tmp.createdAt ;
            user.updatedAt = tmp.updatedAt ;

            const result = new NotFoundException();

            const getWeeklyInfo = jest
            .spyOn(recordsRepository,'getWeeklyInfo')
            .mockResolvedValue(result)
            
            try {
                await recordsRepository.getWeeklyInfo(user);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            }

            expect(getWeeklyInfo).toHaveBeenCalledWith(user);

        })
    })

    describe('createRecord', () => {
      it('should return created record', async () => {

        const createRecordDto = {
            exercise :1,
            setNum :4,
            workout:"40:4-30:3-20:2-10:1",
            start_time:"2023-06-10 21:30:00",
            end_time:"2023-06-10 21:55:00"
        } as CreateRecordDto;
        
        const user = new User();
        user.id = 2;

        const record = {
            "id": 42,
            "userId": 2,
            "exercise": 2,
            "setNum": 4,
            "weights": [40,30,20,10],
            "reps": [4,3,2,1],
            "start_time": "2023-06-10 01:30:00",
            "end_time": "2023-06-10 01:55:00",
            "created_at": "2023-06-10 12:35:29",
            "updated_at": "2023-06-10 12:35:29"
        }

        const createRecordSpy = jest
        .spyOn(recordsRepository,'createRecord')
        .mockResolvedValue(record as Record)

        const createdRecord = await recordsRepository.createRecord(createRecordDto,user);
        console.log("createdRecord :" ,createdRecord)
        expect(createdRecord).toEqual(record)
        expect(createRecordSpy).toHaveBeenCalledWith(createRecordDto,user)


      })  
    })
})