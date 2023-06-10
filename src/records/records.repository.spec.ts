import { RecordsRepository } from "./records.repository"
import { Test, TestingModule } from "@nestjs/testing";
import { DataSource } from "typeorm";
import { Record } from "./entity/records.entity";
import { NotFoundException } from "@nestjs/common";

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
      
            const findOneSpy = jest.spyOn(recordsRepository, 'findOneBy').mockResolvedValue(null);
      
            try {
              await recordsRepository.findOneBy({ id });
            } catch (error) {
              expect(error).toBeInstanceOf(NotFoundException);
            }
      
            expect(findOneSpy).toHaveBeenCalledWith({ id });
          });
    })
})