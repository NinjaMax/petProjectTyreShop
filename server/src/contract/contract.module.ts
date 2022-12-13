import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { Contract } from './entities/contract.model';

@Module({
  controllers: [ContractController],
  providers: [ContractService],
  imports: [ 
    SequelizeModule.forFeature([Contract]),
    
  ],
  exports: [ContractService]
})
export class ContractModule {}
