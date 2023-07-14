import { Controller, Get, Req, Res, Session, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
//import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { Cookies } from './auth/decorators/cookies.decorator';
//import { Request, Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@UseInterceptors(CacheInterceptor)
  @Get('/session')
  //@CacheKey('session-id')
  getSessionId(
    @Session() session: Record<string, any>,
    @Cookies('sessionId') cookies: string,
    //@Req() req: Request,
    //@Res({ passthrough: true }) res: Response,
  
  ) {
    session.visits = session.visits ? session.visits + 1 : 1;
    // console.log('SESSION_VISITS: ', session.visits);
    // //console.log('SESSION: ', session);
    // console.log('SESSION_OBJECT: ', req.session);
    // console.log('SESSION_COKIES: ', req.cookies['sessionId']);
    // console.log('SESSION_OBJECT_ID: ', req.session.id);

    // session.store = 'REDIS_STORE';
  }

  // @Get('/session')
  // getHello(
  //   @Session() session: Record<string, any>,
  //   //@Req() req: Request,
  //   ): string {
  //   const sess = session;
  //   //return this.appService.getSession(session.visits);
  //   if (sess.id) {
  //     return 'GREAT, SESSION HAS GOT!!!';
  //   } else {
  //     return 'SESSION REFUSED, WRONG DATA!!';
  //   }
  //   //return req.cookies['sessionId'];
  // }
}
