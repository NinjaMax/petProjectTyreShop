import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.model';
import { ContractModule } from 'src/contract/contract.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [ 
    SequelizeModule.forFeature([Customer]),
    ContractModule
  ],
  exports: [CustomersService],
})
export class CustomersModule {}
