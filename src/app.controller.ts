import { BadRequestException, Body, Controller, Get, Post,Response, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  async login(@Body() body:any , @Response() res):Promise<any>{
    try {
      const { code, domain } = body;
      if (!code || !domain ){
        console.log("카카오 로그인 정보가 없다고 !!")
        throw new BadRequestException("카카오 로그인 정보가 없습니다.");
      }
      const kakao = await this.appService.kakaoLogin({code,domain});
      console.log(`kakaoUser : ${JSON.stringify(kakao.data)}`);
      res.send({
        user:kakao.data,
        message: 'success ?!'
      })    
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }
}
