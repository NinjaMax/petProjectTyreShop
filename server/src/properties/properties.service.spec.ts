import { Test, TestingModule } from '@nestjs/testing';
import { PropsBrandService } from './props-tyres-services/props-tyre-brand.service';

describe('PropertiesService', () => {
  let service: PropsBrandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropsBrandService],
    }).compile();

    service = module.get<PropsBrandService>(PropsBrandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
