import { Test, TestingModule } from '@nestjs/testing';
import { TelegramApiController } from './telegram-api.controller';
import { TelegramApiService } from './telegram-api.service';

describe('TelegramApiController', () => {
  let controller: TelegramApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelegramApiController],
      providers: [TelegramApiService],
    }).compile();

    controller = module.get<TelegramApiController>(TelegramApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
