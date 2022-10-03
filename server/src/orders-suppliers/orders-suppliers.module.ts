import { Module } from '@nestjs/common';
import { OrdersSuppliersService } from './orders-suppliers.service';
import { OrdersSuppliersController } from './orders-suppliers.controller';

@Module({
  controllers: [OrdersSuppliersController],
  providers: [OrdersSuppliersService]
})
export class OrdersSuppliersModule {}
