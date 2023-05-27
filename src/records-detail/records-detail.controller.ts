import { Controller } from '@nestjs/common';
import { RecordsDetailService } from './records-detail.service';

@Controller('records-detail')
export class RecordsDetailController {
  constructor(private readonly recordsDetailService: RecordsDetailService) {}
}
