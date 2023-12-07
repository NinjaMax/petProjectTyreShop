import { Inject, Injectable } from '@nestjs/common';
import { CreateTelegramApiDto } from './dto/create-telegram-api.dto';
import { UpdateTelegramApiDto } from './dto/update-telegram-api.dto';
import { TELEGRAM_CLIENT } from './types/telegram-client.type';
import { Api, TelegramClient } from 'telegram';
import { bigIntMod } from 'telegram/Helpers';
import bigInt from 'big-integer';

//type Telegram = typeof Api;

@Injectable()
export class TelegramApiService {
  constructor(
    @Inject(TELEGRAM_CLIENT) private readonly telegram: TelegramClient,
  ) {}

  async createMessage(createTelegramApiDto: CreateTelegramApiDto) {
    await this.telegram.connect();
    //new this.telegram.phone.JoinAsPeers();
    const result = await this.telegram.invoke(
      new Api.messages.SendMessage({
        peer: createTelegramApiDto.userReceiver,
        message: createTelegramApiDto.textMesssage,
        randomId: bigInt(Math.floor(Math.random() * 10000000)), //bigIntMod(bigInt(1000000), bigInt(10000000)),
        noWebpage: true,
        noforwards: true,
        //scheduleDate: 43,
        //sendAs: createTelegramApiDto.userReceiver,
      }),
    );
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

  findOne(id: number) {
    return `This action returns a #${id} telegramApi`;
  }

  update(id: number, updateTelegramApiDto: UpdateTelegramApiDto) {
    return `This action updates a #${id} telegramApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} telegramApi`;
  }
}
