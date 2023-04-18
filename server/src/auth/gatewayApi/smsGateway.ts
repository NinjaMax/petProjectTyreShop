import { $hostPost } from './index';

const sendSmsPass = async (valuePass: number, phoneNumber: bigint) =>
  await $hostPost
    .post('/api/v2/api.php', {
      // auth: {
      //   key: 'n7GyAj36j6uZyBA5y1AUwVxNZrml9R2r',
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

      auth: {
        key: 'n7GyAj36j6uZyBA5y1AUwVxNZrml9R2r',
      },
      action: 'GETBALANCE',
      data: {},
    })
    .catch((error: any) => {
      console.log('Не вистачає залишків, або не вірно вказані дані', error);
    });

export { sendSmsPass };