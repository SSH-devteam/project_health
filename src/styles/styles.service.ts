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
    return await this.stylesRepository.createStyle(createStyleDto,user);
  }

  async findAll():Promise<Styles[]> {
    const styles = await this.stylesRepository.find();
    if (styles.length <= 0) {
      throw new NotFoundException("There's no styles");
    }
    return styles
  }

  async findOne(id: number):Promise<Styles> {
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
