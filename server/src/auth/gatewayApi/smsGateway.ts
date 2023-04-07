import { $hostPost } from './index';

const sendSmsPass = async (valuePass: number, phoneNumber: bigint) =>
  await $hostPost
    .post('', {
      auth: {
        key: 'specialsecretapikey',
      },
      action: 'SENDMESSAGE',
      data: {
        recipient: String(phoneNumber),
        channels: ['sms'],
        sms: {
          source: 'SkyParts',
          ttl: 300,
          flash: 0,
          text: `Пароль для регістрації: ${valuePass}`,
        },
      },
    })
    .catch((error) => {
      console.log('Не вистачає залишків, або не вірно вказані дані', error);
    });

export { sendSmsPass };
