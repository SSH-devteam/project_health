import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StylesService } from './styles.service';
import { CreateStyleDto } from './dto/createStyle.dto';
import { UpdateStyleDto } from './dto/updateStyle.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/getUserDecorator';
import { User } from 'src/users/entity/user.entity';
import { Styles } from './entities/style.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('styles')
@UseGuards(AuthGuard('jwt'))
export class StylesController {
  constructor(private readonly stylesService: StylesService) {}

  @Post()
  create(@Body() createStyleDto: CreateStyleDto,@GetUser() user:User):Promise<Styles> {
    return this.stylesService.createStyle(createStyleDto,user);
  }

  @Get()
  findAll() {
    return this.stylesService.getAllStyles();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.stylesService.getOneStyle(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateStyleDto: UpdateStyleDto):Promise<UpdateResult> {
    return this.stylesService.updateStyle(id, updateStyleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number):Promise<DeleteResult> {
    return this.stylesService.deleteStyle(id);
  }
}
