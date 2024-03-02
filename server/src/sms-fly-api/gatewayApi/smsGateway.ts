import { $hostPost } from './index';

type DataMessage = {
  phone: string;
  textMessage: string;
};

const sendMessage = async (data: DataMessage) => {
  await $hostPost
    .post('/api/v2/api.php', {
      auth: {
        key: 'n7GyAj36j6uZyBA5y1AUwVxNZrml9R2r',
      },
      action: 'SENDMESSAGE',
      data: {
        recipient: data.phone,
        channels: ['sms'],
        viber: {
          source: 'Skyparts',
          ttl: 10,
          text: data.textMessage,
          button: {
            caption: 'Перейти на сайт',
            url: 'https://skyparts.com.ua',
          },
          image: '',
        },
        sms: {
          source: 'Skyparts',
          ttl: 10,
          text: data.textMessage,
        },
      },
    })
    .then((response) => response.data)
    .catch((error: any) => {
      console.log('Не вірно вказані дані', error);
    });
};
export { sendMessage };
