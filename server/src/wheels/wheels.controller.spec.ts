import { Test, TestingModule } from '@nestjs/testing';
import { WheelsController } from './wheels.controller';
import { WheelsService } from './wheels.service';

describe('WheelsController', () => {
  let controller: WheelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WheelsController],
      providers: [WheelsService],
    }).compile();

    controller = module.get<WheelsController>(WheelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
