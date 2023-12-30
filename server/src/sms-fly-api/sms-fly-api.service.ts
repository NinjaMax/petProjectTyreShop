import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSmsFlyApiDto } from './dto/create-sms-fly-api.dto';
import { UpdateSmsFlyApiDto } from './dto/update-sms-fly-api.dto';
import { sendMessage } from './gatewayApi/smsGateway';

@Injectable()
export class SmsFlyApiService {
  async sendSmsViber(createSmsFlyApiDto: CreateSmsFlyApiDto) {
    try {
      const sendNewMessage: any = await sendMessage(createSmsFlyApiDto);
      return sendNewMessage;
    } catch (error) {
      throw new HttpException(`Помилка`, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all smsFlyApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} smsFlyApi`;
  }

  update(id: number, updateSmsFlyApiDto: UpdateSmsFlyApiDto) {
    return `This action updates a #${id} smsFlyApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} smsFlyApi`;
  }
}
