import { Inject, Injectable } from '@nestjs/common';
import { CreateTelegramApiDto } from './dto/create-telegram-api.dto';
import { UpdateTelegramApiDto } from './dto/update-telegram-api.dto';
import { TELEGRAM_CLIENT } from './types/telegram-client.type';
import { TelegramClient } from 'telegram';

@Injectable()
export class TelegramApiService {
  constructor(
    @Inject(TELEGRAM_CLIENT) private readonly telegram: TelegramClient,
  ) {}

  async sendMessage(createTelegramApiDto: CreateTelegramApiDto) {
    await this.telegram.connect();

    const result = await this.telegram.sendMessage(
      createTelegramApiDto.userReceiver, 
      { 
        message: createTelegramApiDto.textMesssage,
      }
    )

    if (result) {
      return true;
    } else {
      return false;
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
