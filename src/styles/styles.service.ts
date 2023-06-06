import { Injectable, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateStyleDto } from './dto/createStyle.dto';
import { UpdateStyleDto } from './dto/updateStyle.dto';
import { StylesRepository } from './styles.repository';
import { Styles } from './entities/style.entity';
import { User } from 'src/users/entity/user.entity';
import { NotFoundError } from 'rxjs';
import { symlink } from 'fs';
import { type } from 'os';
import { resourceLimits } from 'worker_threads';
import { DeleteResult, UpdateResult } from 'typeorm';
import { get } from 'http';
import { getDateTime } from 'src/getDateTime';

@Injectable()
@UsePipes(ValidationPipe)
export class StylesService {
  constructor(private stylesRepository:StylesRepository) {}

  async createStyle(createStyleDto: CreateStyleDto,user:User):Promise<Styles> {
    return await this.stylesRepository.createStyle(createStyleDto,user);
  }

  async getAllStyles():Promise<Styles[]> {
    const styles = await this.stylesRepository.find();
    if (styles.length <= 0) {
      throw new NotFoundException("There's no styles");
    }
    return styles
  }

  async getOneStyle(id: number):Promise<Styles> {
    const style = await this.stylesRepository.findOneBy({id});
    if (!style) {
      throw new NotFoundException(`style id with ${id} doesn't exist`)
    }
    return style

  }

  async updateStyle(id: number, updateStyleDto: UpdateStyleDto):Promise<UpdateResult> {
    const { name } = updateStyleDto;
    const updated_at = getDateTime();
    const result = await this.stylesRepository.update(id,{name,updated_at});
    if (result.affected == 0) {
      throw new NotFoundException(`style id with ${id} doesn't exist`);
    }    
    return result
  }

  async deleteStyle(id: number):Promise<DeleteResult> {
    const result = await this.stylesRepository.delete({id});
    if (result.affected === 0 ) {
      throw new NotFoundException(`style id with ${id} doesn't exist`);
    }
    return result
  }
}
