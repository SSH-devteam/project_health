import { PartialType } from '@nestjs/mapped-types';
import { CreateStyleDto } from './createStyle.dto';

export class UpdateStyleDto extends PartialType(CreateStyleDto) {}
