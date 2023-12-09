import { Inject, Injectable } from '@nestjs/common';
import { CreateTelegramApiDto } from './dto/create-telegram-api.dto';
import { UpdateTelegramApiDto } from './dto/update-telegram-api.dto';
import { TELEGRAM_CLIENT } from './types/telegram-client.type';
import { Api, TelegramClient } from 'telegram';
//import { bigIntMod } from 'telegram/Helpers';
import bigInt from 'big-integer';
import { Button } from 'telegram/tl/custom/button';

//type Telegram = typeof Api;

@Injectable()
export class TelegramApiService {
  constructor(
    @Inject(TELEGRAM_CLIENT) private readonly telegram: TelegramClient,
  ) {}

  async sendMessage(createTelegramApiDto: CreateTelegramApiDto) {
    await this.telegram.connect();
    const buttonYes = this.telegram.buildReplyMarkup(
      [Button.inline('Так', Buffer.from('Актуально')),
      Button.inline('Ні', Buffer.from('Не Актуально'))]
    );
    const buttonNo = this.telegram.buildReplyMarkup(
      Button.inline('Ні', Buffer.from('Не Актуально'))
    );
    const result = await this.telegram.sendMessage(
      createTelegramApiDto.userReceiver, 
      { 
        message: createTelegramApiDto.textMesssage,
        buttons: 
        //[
          buttonYes
          //Button.inline('Так', Buffer.from('Актуально')),
          //Button.inline('Ні', Buffer.from('Не Актуально')),
        //]
      }
    )
    // const result = await this.telegram.invoke(
    //   new Api.messages.SendMessage({
    //     peer: createTelegramApiDto.userReceiver,
    //     message: createTelegramApiDto.textMesssage,
    //     randomId: bigInt(Math.floor(Math.random() * 10000000)), //bigIntMod(bigInt(1000000), bigInt(10000000)),
    //     noWebpage: true,
    //     noforwards: true,
    //     //scheduleDate: 43,
    //     //sendAs: createTelegramApiDto.userReceiver,
    //   }),
    // );

    // const result = await this.telegram.invoke(
    //     new this.telegram.messages.SendMessage({
    //     peer: "username",
    //     message: "Hello there!",
    //     randomId: BigInt("-4156887774564"),
    //     noWebpage: true,
    //     noforwards: true,
    //     scheduleDate: 43,
    //     sendAs: "username",
    //   })
    // );
    //console.log('TELTEGRAM_MESSAGE: ', result);

    if (result) {
      return 'ПОВІДОМЛЕННЯ ВІДПРАВЛЕНО';
    } else {
      return 'ПОМИЛКА';
    }
  }

  findAll() {
    return `This action returns all telegramApi`;
  }

  async getMessagesByUser(userName: string) {
    await this.telegram.connect();
    const result = this.telegram.getMessages(userName, {
      limit: 10,
    });
    const filterOutMsg: any[] = (await result)
      .filter(
        (items: any) => items.out === false && items.className === 'Message',
      )
      .map((item) => item.message);
    return filterOutMsg;
  }
  async getAllDialogs() {
    await this.telegram.connect();
    const result = this.telegram.getMe();
    //const first = result[0];
    return result;
  }

  update(id: number, updateTelegramApiDto: UpdateTelegramApiDto) {
    return `This action updates a #${id} telegramApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} telegramApi`;
  }
}
