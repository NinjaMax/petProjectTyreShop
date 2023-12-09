import { TELEGRAM_CLIENT } from './types/telegram-client.type';
import { ConfigService } from '../config/config.service';
import { FactoryProvider } from '@nestjs/common';
import { TelegramClient } from 'telegram';
import { StoreSession, StringSession } from 'telegram/sessions';
import input from 'input';

export const telegramClientFactory: FactoryProvider<TelegramClient> = {
  provide: TELEGRAM_CLIENT,
  useFactory: async (configService: ConfigService) => {

    // const stringSession = '';
    // //const BOT_TOKEN = "";
    // const telegramClient = new TelegramClient(
    //   new StringSession(stringSession),
    //   +configService.get('TELEGRAM_API_ID'),
    //   configService.get('TELEGRAM_API_HASH'),
    //   { connectionRetries: 5 },
    // );
    // await telegramClient.start({
    //   botAuthToken: configService.get('TELEGRAM_API_BOT_KEY'),
    // });
    // return telegramClient;
    //------------------------------------------------------//
    //const stringSession = new StringSession('');
    const storeSession = new StoreSession('skysnab_session');
    console.log('Loading interactive example Telegram Api...');
    //const getSession: any = await stringSession.load();
    //console.log('GET_SESSION: ', getSession);
    
    const clientTelegram = new TelegramClient(
      storeSession,
      +configService.get('TELEGRAM_API_ID'),
      configService.get('TELEGRAM_API_HASH'),
      { connectionRetries: 5 },
    );
    if (await clientTelegram.checkAuthorization()) {
      console.log('Telegram Api session loaded successfully...')
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
    //stringSession.save();
    //console.log('TELEGRAM_SESSION: ', clientTelegram.session);
    //console.log('TELEGRAM_SESSION: ', stringSession);
    return clientTelegram;
  }
    //console.log(clientTelegram.session.save());

    // Save this string to avoid logging in again
    //------------------------------------------------------//
    // const clientTelegram = new TelegramClient(
    //   'session_name',
    //   +configService.get('TELEGRAM_API_ID'), 
    //   configService.get('TELEGRAM_API_HASH'), 
    //   {
    //     useWSS: false, // Important. Most proxies cannot use SSL.
    //     proxy: {
    //     ip: "149.154.167.40", // Proxy host (IP or hostname)
    //     port: 443, // Proxy port
    //     MTProxy: false, // Whether it's an MTProxy or a normal Socks one
    //     secret: "00000000000000000000000000000000", // If used MTProxy then you need to provide a secret (or zeros).
    //     socksType: 5, // If used Socks you can choose 4 or 5.
    //     timeout: 2, // Timeout (in seconds) for connection,
    //   },
    // });
    // await clientTelegram.connect();

    // return clientTelegram;
  },
  inject: [ConfigService],
};
