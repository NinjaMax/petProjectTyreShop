import { Test, TestingModule } from '@nestjs/testing';
import { OrdersSuppliersService } from './orders-suppliers.service';

describe('OrdersSuppliersService', () => {
  let service: OrdersSuppliersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersSuppliersService],
    }).compile();

    service = module.get<OrdersSuppliersService>(OrdersSuppliersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
