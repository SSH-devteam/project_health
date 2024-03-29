import { Module } from '@nestjs/common';
import { StylesService } from './styles.service';
import { StylesController } from './styles.controller';
import { typeOrmConfig } from 'src/configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Styles } from './entities/style.entity';
import { StylesRepository } from './styles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Styles])],
  controllers: [StylesController],
  providers: [StylesService,StylesRepository]
})

export class StylesModule {}
