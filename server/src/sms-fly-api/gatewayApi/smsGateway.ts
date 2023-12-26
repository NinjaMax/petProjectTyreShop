import { ConfigService } from 'src/config/config.service';
import { $hostPost } from './index';

type DataMessage = {
  phone: string;
  textMessage: string;
};

const sendMessage = async (data: DataMessage) => {
  const keyApi = (config: ConfigService) => config.get('SMSGATEWAY_API_KEY');

  await $hostPost
    .post(
      '/api/v2/api.php',
      //data,
      // auth: {
      //   key: 'n7GyAj36j6uZyBA5y1AUwVxNZrml9R2r',valuePass: number, phoneNumber: bigint
      // },
      // action: 'SENDMESSAGE',
      // data: {
      //   recipient: phoneNumber.toString(),
      //   channels: ['sms'],
      //   sms: {
      //     source: 'SkyParts',
      //     ttl: 300,
      //     flash: 0,
      //     text: `Пароль для регістрації: ${valuePass}`,
      //   },
      // },
      // {
      //   auth: {
      //     key: 'n7GyAj36j6uZyBA5y1AUwVxNZrml9R2r',
      //   },
      //   action: 'GETBALANCE',
      // }
      
      // SMSGATEWAY_API_KEY='n7GyAj36j6uZyBA5y1AUwVxNZrml9R2r'
      // SMSGATEWAY_API_URL='https://sms-fly.ua/api/v2/api.php'

      {
        auth: {
          key: keyApi,
        },
        action: 'SENDMESSAGE',
        data: {
          recipient: data.phone, //'380501234567',
          channels: ['viber', 'sms'],
          viber: {
            source: 'Skyparts',
            ttl: 20,
            text: data.textMessage,
            button: {
              caption: 'Перейти на сайт',
              url: 'https://skyparts.com.ua',
            },
            image: 'https://example.org/image.png',
          },
          sms: {
            source: 'Skyparts',
            ttl: 20,
            text: data.textMessage,
          }
        }
      }
    )
    .then((response) => response.data)
    .catch((error: any) => {
      console.log('Не вірно вказані дані', error);
    });
};
export { sendMessage };
