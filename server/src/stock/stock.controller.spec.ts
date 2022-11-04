import { Test, TestingModule } from '@nestjs/testing';
import { StockTyresController } from './stock-tyres.controller';
import { StockTyresService } from './stock-tyres.service';

describe('StockController', () => {
  let controller: StockTyresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockTyresController],
      providers: [StockTyresService],
    }).compile();

    controller = module.get<StockTyresController>(StockTyresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
