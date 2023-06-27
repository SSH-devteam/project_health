import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { asyncScheduler } from 'rxjs';
import axios from 'axios';
import * as qs from 'qs';
import { AuthKakaoDto } from 'src/users/dto/authKakao.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getUser(userId: number) {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async findOne(kakaoId, email) {
    return await this.userRepository.findOne({
      where: { kakaoId, email },
    });

    // if (!found) {
    //   return false;
    // } else {
    //   return found;
    // }
  }

  async createUser(authKakaoDto: AuthKakaoDto) {
    return await this.userRepository.createUser(authKakaoDto);
  }

  async signIn(authKakaoDto: AuthKakaoDto): Promise<{ accessToken: string }> {
    const { kakaoId, email } = authKakaoDto;
    const user = await this.userRepository.findOne({
      where: { kakaoId, email },
    });

    if (user) {
      const payload = { kakaoId: kakaoId, email: email };
      const accessToken = await this.jwtService.sign(payload);
      console.log(user);
      return { accessToken };
    }
  }

  async kakaoLogin(param: { code: any; domain: any }): Promise<any> {
    const { code, domain } = param;
    const kakaoKey = '4255356510e32dc7f25294717ab141c8'; //REST API Key
    const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
    const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';

    const body = {
      grant_type: 'authorization_code',
      client_id: kakaoKey,
      redirect_uri: `${domain}/kakao-callback`,
      code,
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    // console.log(body,headers)

    try {
      // token 얻는 request보냄
      const response = await axios({
        method: 'POST',
        url: kakaoTokenUrl,
        timeout: 30000,
        headers,
        data: qs.stringify(body),
      });

      if (response.status === 200) {
        const headerUserInfo = {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: 'Bearer ' + response.data.access_token,
        };

        // 유저 정보 request 보냄
        const responseUserInfo = await axios({
          method: 'GET',
          url: kakaoUserInfoUrl,
          timeout: 30000,
          headers: headerUserInfo,
        });

        return responseUserInfo;

        // controller 부분에 확인 판단 던지자
        // 로그인 성공
        if (responseUserInfo.status === 200) {
          // console.log(`userInfo : ${JSON.stringify(responseUserInfo.data)}`);
          console.log('success : get userInfo');
          return responseUserInfo;
        } else {
          return;
          // 로그인 정보 없는 경우
          // TO DO 유저 정보 DB에 입력
          throw new UnauthorizedException();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}
