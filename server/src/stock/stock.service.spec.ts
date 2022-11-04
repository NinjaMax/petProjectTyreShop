import { Test, TestingModule } from '@nestjs/testing';
import { StockTyresService } from './stock-tyres.service';

describe('StockService', () => {
  let service: StockTyresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockTyresService],
    }).compile();

    service = module.get<StockTyresService>(StockTyresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
