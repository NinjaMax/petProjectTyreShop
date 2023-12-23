import { Test, TestingModule } from '@nestjs/testing';
import { PayviewsService } from './payviews.service';

describe('PayviewsService', () => {
  let service: PayviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayviewsService],
    }).compile();

    service = module.get<PayviewsService>(PayviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
