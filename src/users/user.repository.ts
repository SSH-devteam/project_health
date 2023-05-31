import { DataSource, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthKakaoDto } from 'src/users/dto/authKakao.dto';
import { Time } from 'src/getDateTime';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }

  async createUser(authKakaoDto: AuthKakaoDto) {
    const { kakaoId, email } = authKakaoDto;
    const timeFunc = new Time ;;

    const user = this.create({
      kakaoId,
      email,
      createdAt: timeFunc.getDateTime(),
      updatedAt: timeFunc.getDateTime(),
    });

    try {
      await this.save(user);
      console.log(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
