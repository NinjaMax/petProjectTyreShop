import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesBrandController } from './props-tyres-controllers/props-tyre-brand.controller';
import { PropertiesBrandService } from './props-tyres-services/props-tyre-brand.service';

describe('PropertiesController', () => {
  let controller: PropertiesBrandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesBrandController],
      providers: [PropertiesBrandService],
    }).compile();

    controller = module.get<PropertiesBrandController>(PropertiesBrandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
