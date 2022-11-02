import { Test, TestingModule } from '@nestjs/testing';
import { PaynmentController } from './paynment.controller';
import { PaynmentService } from './paynment.service';

describe('PaynmentController', () => {
  let controller: PaynmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaynmentController],
      providers: [PaynmentService],
    }).compile();

    controller = module.get<PaynmentController>(PaynmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
