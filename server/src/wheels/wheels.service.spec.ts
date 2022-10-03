import { Test, TestingModule } from '@nestjs/testing';
import { WheelsService } from './wheels.service';

describe('WheelsService', () => {
  let service: WheelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WheelsService],
    }).compile();

    service = module.get<WheelsService>(WheelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
