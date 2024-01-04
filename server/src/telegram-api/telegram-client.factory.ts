import { TELEGRAM_CLIENT } from './types/telegram-client.type';
import { ConfigService } from '../config/config.service';
import { FactoryProvider } from '@nestjs/common';
import { TelegramClient } from 'telegram';
import { StoreSession } from 'telegram/sessions';
import input from 'input';

export const telegramClientFactory: FactoryProvider<TelegramClient> = {
  provide: TELEGRAM_CLIENT,
  useFactory: async (configService: ConfigService) => {
    const storeSession = new StoreSession('skysnab_session');
    console.log('Loading interactive example Telegram Api...');
    const clientTelegram = new TelegramClient(
      storeSession,
      +configService.get('TELEGRAM_API_ID'),
      configService.get('TELEGRAM_API_HASH'),
      { connectionRetries: 5 },
    );
    if (await clientTelegram.checkAuthorization()) {
      console.log('Telegram Api session loaded successfully...');
      return clientTelegram;
    } else {
      await clientTelegram.start({
        phoneNumber: async () => await input.text('number ?'),
        password: async () => await input.text('password?'),
        phoneCode: async () => await input.text('Code ?'),
        onError: (err) => console.log(err),
      });
      console.log('You should Telegram Api now be connected.');
      clientTelegram.session.save();
      return clientTelegram;
    }
  },
  inject: [ConfigService],
};
