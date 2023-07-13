import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getSession(session: string): string {
    return `Hello Sessions! + ${session}`;
  }
}
