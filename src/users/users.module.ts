import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  // 이 imports를 추가함으로써 Users Repository를 주입할 수 있다.
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UsersModule {}
