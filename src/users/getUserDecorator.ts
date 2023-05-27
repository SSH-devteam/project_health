import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './entity/user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

// req를 보낸 User의 정보를 DB에서 가져옴
