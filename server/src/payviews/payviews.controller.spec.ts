import { Test, TestingModule } from '@nestjs/testing';
import { PayviewsController } from './payviews.controller';
import { PayviewsService } from './payviews.service';

describe('PayviewsController', () => {
  let controller: PayviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayviewsController],
      providers: [PayviewsService],
    }).compile();

    controller = module.get<PayviewsController>(PayviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
