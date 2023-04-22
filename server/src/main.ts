import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import * as fs from 'fs';
import cookieParser from 'cookie-parser';
import { join } from 'path';

async function bootstrap() {
  try {

    const httpsOptions = {
      key: fs.readFileSync(join(process.cwd(), './config/cert.key')),
      cert: fs.readFileSync(join(process.cwd(),'./config/cert.crt')),
    };
    const app = await NestFactory.create(AppModule, { httpsOptions });
    const configService = app.get(ConfigService);
    app.use(cookieParser());
    app.enableCors({
      origin: [
        'https://localhost:3000',
        'https://localhost:3000/',
        'https://localhost:4000',
        //configService.get('CORS');
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true, // need to change false
      // allowedHeaders: [
      //   'Accept',
      //   'Content-Type',
      //   'Authorization',
      // ]
    });
    const PORT: number = +configService.get('PORT' || '5000');
    await app.listen(PORT, () => console.log(`Server Start on ${PORT}`));

  } catch (error) {
    console.log(error);
  }
}
bootstrap();
