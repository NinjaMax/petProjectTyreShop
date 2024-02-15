import { Controller, Get, Req, Res, Session, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
//import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { Cookies } from './auth/decorators/cookies.decorator';
import { Response } from 'express';
import path from 'path';
//import { Request, Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/session')
  getSessionId(
    @Session() session: Record<string, any>,
    @Cookies('sessionId') cookies: string,
  
  ) {
    session.visits = session.visits ? session.visits + 1 : 1;
  }

  // @Get('*')
  // async getIndex(@Res() res: Response) {
  //   res.sendFile(
  //     path.resolve(__dirname, '..', '..', 'client/dist/', 'index.html'),
  //   );
  // }
}
