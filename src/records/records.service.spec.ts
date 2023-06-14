import { User } from "src/users/entity/user.entity";
import { Record } from "./entity/records.entity";
import { RecordsRepository } from "./records.repository";
import { RecordsService } from "./records.service";
import { CreateRecordDto } from "./dto/createRecord.dto";
import { Test, TestingModule } from "@nestjs/testing";

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
          },
        },
      ],
    }).compile();

    recordService = module.get<RecordsService>(RecordsService);
    recordRepository = module.get<RecordsRepository>(RecordsRepository);
  });

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

        jest.spyOn(recordRepository,'createRecord').mockResolvedValue(record as Record)


        const result = await recordService.createRecord(dto as CreateRecordDto,user as User)
        expect(result).toEqual(record)
    })
  })

})