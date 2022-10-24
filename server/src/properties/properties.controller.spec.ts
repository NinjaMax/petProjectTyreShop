import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesBrandController } from './properties-brand.controller';
import { PropertiesBrandService } from './properties-brand.service';

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
