import { async } from "rxjs";
import { RecordsController } from "./records.controller"
import { RecordsService } from "./records.service";
import { Test, TestingModule } from "@nestjs/testing";



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
                        getRecordBy:jest.fn() ,
                        getWeeklyInfo:jest.fn() ,
                        createRecord:jest.fn() ,
                        updateRecord:jest.fn() ,
                        deleteRecord:jest.fn() ,
                    }
                }

            ]
        }).compile();

        recordController = module.get<RecordsController>(RecordsController);
    })

    

})