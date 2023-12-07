import { Module } from '@nestjs/common';
import { TelegramApiService } from './telegram-api.service';
import { TelegramApiController } from './telegram-api.controller';
import { ConfigModule } from '../config/config.module';
import { TELEGRAM_CLIENT } from './types/telegram-client.type';
import { telegramClientFactory } from './telegram-client.factory';

@Module({
  imports: [ConfigModule],
  exports: [TelegramApiService, TELEGRAM_CLIENT],
  controllers: [TelegramApiController],
  providers: [TelegramApiService, telegramClientFactory],
})
export class TelegramApiModule {}
