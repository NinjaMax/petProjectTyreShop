import { Test, TestingModule } from '@nestjs/testing';
import { OrdersSuppliersController } from './orders-suppliers.controller';
import { OrdersSuppliersService } from './orders-suppliers.service';

describe('OrdersSuppliersController', () => {
  let controller: OrdersSuppliersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersSuppliersController],
      providers: [OrdersSuppliersService],
    }).compile();

    controller = module.get<OrdersSuppliersController>(OrdersSuppliersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
