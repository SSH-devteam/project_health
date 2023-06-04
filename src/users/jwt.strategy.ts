import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as config from 'config';
import { UserRepository } from './user.repository';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      secretOrKey: 'Secret1234',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { kakaoId, email } = payload;
    const user = await this.userRepository.findOne({
      where: { kakaoId, email },
    });
    console.log(user);
    console.log('JWT validate is working');

    if (!user) {
      throw new UnauthorizedException(`user is not exist`);
    }
    return user;
  }
}
