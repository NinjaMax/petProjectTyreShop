import { Test, TestingModule } from '@nestjs/testing';
import { PaytypesService } from './paytypes.service';

describe('PaytypesService', () => {
  let service: PaytypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaytypesService],
    }).compile();

    service = module.get<PaytypesService>(PaytypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
