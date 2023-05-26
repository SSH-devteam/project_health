import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthKakaoDto } from 'src/users/dto/authKakao.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }

  private getDateTime() {
    const now = new Date();
    const date = now.getFullYear() + '/' + now.getMonth() + '/' + now.getDate();
    const time =
      now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    return date + time;
  }

  async createUser(authKakaoDto: AuthKakaoDto) {
    const { kakaoId, email } = authKakaoDto;
    const user = this.create({
      kakaoId,
      email,
      createdAt: this.getDateTime(),
      updatedAt: this.getDateTime(),
    });

    try {
      await this.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
