import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import * as fs from 'fs';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import session from 'express-session';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import csurf from 'csurf';

async function bootstrap() {
  try {
    const httpsOptions = {
      key: fs.readFileSync(join(process.cwd(), './config/cert.key')),
      cert: fs.readFileSync(join(process.cwd(), './config/cert.crt')),
    };
    const app = await NestFactory.create(AppModule, { httpsOptions });
    const configService = app.get(ConfigService);

    const redisClient = createClient({
      socket: {
        host: configService.get('REDIS_HOST'),
        port: +configService.get('REDIS_PORT'),
      },
    });
    redisClient.connect().catch(console.error);
    const redisStore = new RedisStore({
      client: redisClient,
      prefix: 'skyApp_session: ', 
      ttl: 1296000000,
    });
    app.use(cookieParser());
    app.use(
      session({
        store: redisStore,
        secret: 'secret-sky$123456',
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: true,
          httpOnly: true,
          maxAge: 1296000000,
        },
        name: 'sessionId',
      }),
    );
    app.enableCors({
      origin: ['https://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true, // need to change false
    });
    app.use(csurf());
    const PORT: number = +configService.get('PORT' || '5000');
    await app.listen(PORT, () => console.log(`Server Start on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}
bootstrap();

