import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesBrandService } from './properties-brand.service';

describe('PropertiesService', () => {
  let service: PropertiesBrandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertiesBrandService],
    }).compile();

    service = module.get<PropertiesBrandService>(PropertiesBrandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
