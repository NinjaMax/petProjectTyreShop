import { TELEGRAM_CLIENT } from './types/telegram-client.type';
import { ConfigService } from '../config/config.service';
import { FactoryProvider } from '@nestjs/common';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import input from 'input';

export const telegramClientFactory: FactoryProvider<TelegramClient> = {
  provide: TELEGRAM_CLIENT,
  useFactory: async (configService: ConfigService) => {
    const stringSession = '';
    //const BOT_TOKEN = "";
    const telegramClient = new TelegramClient(
      new StringSession(stringSession),
      +configService.get('TELEGRAM_API_ID'),
      configService.get('TELEGRAM_API_HASH'),
      { connectionRetries: 5 },
    );
    await telegramClient.start({
      botAuthToken: configService.get('TELEGRAM_API_BOT_KEY'),
    });
    return telegramClient;
    //------------------------------------------------------//
    // const stringSession = new StringSession('');
    // console.log('Loading interactive example...');
    // const clientTelegram = new TelegramClient(
    //   stringSession,
    //   +configService.get('TELEGRAM_API_ID'),
    //   configService.get('TELEGRAM_API_HASH'),
    //   { connectionRetries: 5 },
    // );
    // await clientTelegram.start({
    //   phoneNumber: async () => await input.text('number ?'),
    //   password: async () => await input.text('password?'),
    //   phoneCode: async () => await input.text('Code ?'),
    //   onError: (err) => console.log(err),
    // });
    // console.log('You should now be connected.');
    // console.log(clientTelegram.session.save());

    // return clientTelegram; // Save this string to avoid logging in again
  },
  inject: [ConfigService],
};
