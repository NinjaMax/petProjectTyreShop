import { Test, TestingModule } from '@nestjs/testing';
import { PaynmentService } from './paynment.service';

describe('PaynmentService', () => {
  let service: PaynmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaynmentService],
    }).compile();

    service = module.get<PaynmentService>(PaynmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
