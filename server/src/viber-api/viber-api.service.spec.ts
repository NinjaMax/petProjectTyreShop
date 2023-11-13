import { Test, TestingModule } from '@nestjs/testing';
import { ViberApiService } from './viber-api.service';

describe('ViberApiService', () => {
  let service: ViberApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ViberApiService],
    }).compile();

    service = module.get<ViberApiService>(ViberApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
