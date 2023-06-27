import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
  ValidationPipe,
  Res,
  NotFoundException,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthKakaoDto } from 'src/users/dto/authKakao.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post('/signup')
  // create(@Body() createUserDto: CreateUserDto, kakaoData: any) {
  //   this.usersService.createUser(createUserDto, kakaoData);
  // }

  @Post('/login')
  login(
    @Body(ValidationPipe) authKakaoDto: AuthKakaoDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.signIn(authKakaoDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getUser(@Req() req: any) {
    return this.usersService.getUser(req.user.id);
  }

  @Post('/kakaologin')
  async kakaoLogin(@Body(ValidationPipe) body: any, @Res() res): Promise<any> {
    try {
      console.log('로그인 요청');

      const { code, domain } = body;
      if (!code || !domain) {
        console.log('카카오 로그인 정보가 없다고 !!');
        throw new BadRequestException('카카오 로그인 정보가 없습니다.');
      }

      const kakao = await this.usersService.kakaoLogin({ code, domain });

      if (kakao.status == 200) {
        const user = await this.usersService.findOne(
          kakao.data.id,
          kakao.data.kakao_account.email,
        );

        if (!user) {
          const userInfo: AuthKakaoDto = {
            kakaoId: kakao.data.id,
            email: kakao.data.kakao_account.email,
          };
          const user = await this.usersService.createUser(userInfo);
          const accessToken = await this.usersService.signIn(user);
          res.send({ message: 'user created', accessToken });
          return accessToken;
        } else {
          const accessToken = await this.usersService.signIn(user);
          res.send({ message: 'user signin', accessToken });
          return accessToken;
        }

        // TO DO res send 구현!!!
        // res.send(accessToken);
        // return 'login success';
      } else {
        throw new NotFoundException('kakao user doesnt exist');
      }
      //   return this.usersService.signIn();
      // } else {
      //   res.send({
      //     message: 'You have to sign in',
      //   });
      // }

      // if kaka?
      // console.log(`kakaoUser : ${JSON.stringify(kakao.data)}`);
      // res.send({
      //   user: kakao.data,
      //   message: 'success ?!',
      // });
      // return kakao.data;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }
}
