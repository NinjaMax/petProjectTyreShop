import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersSuppliersService } from './orders-suppliers.service';
import { OrdersSuppliersController } from './orders-suppliers.controller';
import { OrdersSupplier } from './entities/orders-supplier.model';

@Module({
  controllers: [OrdersSuppliersController],
  providers: [OrdersSuppliersService],
  imports: [
    SequelizeModule.forFeature([OrdersSupplier]),
    
  ],
  exports:[OrdersSuppliersService],
})
export class OrdersSuppliersModule {}
