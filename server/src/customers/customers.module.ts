import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.model';
import { AuthModule } from '../auth/auth.module';
import { ContractModule } from '../contract/contract.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [
    SequelizeModule.forFeature([Customer]),
    forwardRef(() => ContractModule),
    forwardRef(() => AuthModule),
  ],
  exports: [CustomersService],
})
export class CustomersModule {}
