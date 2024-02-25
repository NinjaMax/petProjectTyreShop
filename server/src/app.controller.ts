import { Controller, Get, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { Cookies } from './auth/decorators/cookies.decorator';

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
}
