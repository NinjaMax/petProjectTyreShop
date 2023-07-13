import { Controller, Get, Req, Res, Session, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { Cookies } from './auth/decorators/cookies.decorator';
import { Request, Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@UseInterceptors(CacheInterceptor)
  @Get()
  //@CacheKey('session-id')
  getSessionId(
    @Session() session: Record<string, any>,
    @Cookies('sessioId') cookies: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  
  ) {
    session.visits = session.visits ? session.visits + 1 : 1;
  }
  @Get('/session')
  getHello(
    @Req() req: Request,
  ): string {
    //return this.appService.getSession(session.visits);
    //if (req.cookies.value === )
    return req.cookies['connect,sid'];
  }





}
