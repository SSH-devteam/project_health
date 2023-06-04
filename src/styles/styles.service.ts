import { Injectable, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateStyleDto } from './dto/createStyle.dto';
import { UpdateStyleDto } from './dto/updateStyle.dto';
import { StylesRepository } from './styles.repository';
import { Styles } from './entities/style.entity';
import { User } from 'src/users/entity/user.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
@UsePipes(ValidationPipe)
export class StylesService {
  constructor(private stylesRepository:StylesRepository) {}

  async createStyle(createStyleDto: CreateStyleDto,user:User):Promise<Styles> {
    return this.stylesRepository.createStyle(createStyleDto,user);
  }

  async findAll() {
    return `This action returns all styles`;
  }

  async findOne(id: number) {
    const style = await this.stylesRepository.findOneBy({id});
    if (!style) {
      throw new NotFoundException(`style id with ${id} doesn't exist`)
    }

    return style


  }

  async update(id: number, updateStyleDto: UpdateStyleDto) {
    return `This action updates a #${id} style`;
  }

  async remove(id: number) {
    return `This action removes a #${id} style`;
  }
}
