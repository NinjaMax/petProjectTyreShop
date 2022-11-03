import { Test, TestingModule } from '@nestjs/testing';
import { PriceTyresService } from './price-tyres.service';

describe('PricesService', () => {
  let service: PriceTyresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceTyresService],
    }).compile();

    service = module.get<PriceTyresService>(PriceTyresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
