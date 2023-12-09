import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TelegramApiService } from './telegram-api.service';
import { CreateTelegramApiDto } from './dto/create-telegram-api.dto';
import { UpdateTelegramApiDto } from './dto/update-telegram-api.dto';

@Controller('telegram-api')
export class TelegramApiController {
  constructor(private readonly telegramApiService: TelegramApiService) {}

  @Post('/send-message')
  async create(@Body() createTelegramApiDto: CreateTelegramApiDto) {
    return this.telegramApiService.sendMessage(createTelegramApiDto);
  }

  @Get('/all')
  async findAll() {
    return this.telegramApiService.getAllDialogs();
  }

  @Get('/gethistory/:id')
  async findOne(@Param('id') id: string) {
    return this.telegramApiService.getMessagesByUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTelegramApiDto: UpdateTelegramApiDto) {
    return this.telegramApiService.update(+id, updateTelegramApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.telegramApiService.remove(+id);
  }
}
