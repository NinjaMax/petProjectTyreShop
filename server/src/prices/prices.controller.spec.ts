import { Test, TestingModule } from '@nestjs/testing';
import { PriceTyresController } from './price-tyres.controller';
import { PriceTyresService } from './price-tyres.service';

describe('PricesController', () => {
  let controller: PriceTyresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PriceTyresController],
      providers: [PriceTyresService],
    }).compile();

    controller = module.get<PriceTyresController>(PriceTyresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
