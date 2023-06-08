import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './createCharacter.dto';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {}
