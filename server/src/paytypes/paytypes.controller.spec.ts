import { Test, TestingModule } from '@nestjs/testing';
import { PaytypesController } from './paytypes.controller';
import { PaytypesService } from './paytypes.service';

describe('PaytypesController', () => {
  let controller: PaytypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaytypesController],
      providers: [PaytypesService],
    }).compile();

    controller = module.get<PaytypesController>(PaytypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
