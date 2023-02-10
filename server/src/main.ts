import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import cors from 'cors';

async function bootstrap() {
  try {
      const app = await NestFactory.create(AppModule);
      
      const configService = app.get(ConfigService);
      app.enableCors({
        origin: [
          'http://localhost:4000',

        ],
        methods: ["GET", "POST", "PUT", "PATCH"],
        credentials: true,
      });
      const PORT: number = +configService.get('PORT' || '5000') ;
      await app.listen(PORT, () => console.log(`Server Start on ${PORT}`));

  } catch (error) {
    console.log(error);
  }
}
bootstrap();
