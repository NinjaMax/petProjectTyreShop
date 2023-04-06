import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customer } from './entities/customer.model';
import { ContractModule } from 'src/contract/contract.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [ 
    SequelizeModule.forFeature([Customer]),
    ContractModule, AuthModule
  ],
  exports: [CustomersService],
})
export class CustomersModule {}
