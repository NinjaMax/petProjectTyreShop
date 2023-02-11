import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
//import cors from 'cors';

async function bootstrap() {
  try {
      const app = await NestFactory.create(AppModule);
      
      const configService = app.get(ConfigService);
      app.enableCors({
        origin: [
          'http://localhost:3000',
          'http://localhost:4000'
        ],
        methods: ["GET", "POST", "PUT", "PATCH","DELETE"],
        credentials: true, // need to change false
        // allowedHeaders: [
        //   'Accept',
        //   'Content-Type',
        //   'Authorization',
        // ]
      });
      const PORT: number = +configService.get('PORT' || '5000') ;
      await app.listen(PORT, () => console.log(`Server Start on ${PORT}`));

  } catch (error) {
    console.log(error);
  }
}
bootstrap();
