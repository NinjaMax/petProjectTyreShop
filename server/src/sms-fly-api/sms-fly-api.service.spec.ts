import { Test, TestingModule } from '@nestjs/testing';
import { SmsFlyApiService } from './sms-fly-api.service';

describe('SmsFlyApiService', () => {
  let service: SmsFlyApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsFlyApiService],
    }).compile();

    service = module.get<SmsFlyApiService>(SmsFlyApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
