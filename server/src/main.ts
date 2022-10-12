import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  try {
      const app = await NestFactory.create(AppModule);
      const configService = app.get(ConfigService);
      const PORT = +configService.get('PORT' || '5000') ;
      await app.listen(PORT, () => console.log(`Server Start on ${PORT}`));

  } catch (error) {
    console.log(error);
  }
}
bootstrap();
