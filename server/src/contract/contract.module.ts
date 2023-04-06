import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { Contract } from './entities/contract.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ContractController],
  providers: [ContractService],
  imports: [ 
    SequelizeModule.forFeature([Contract]),
    AuthModule
  ],
  exports: [ContractService]
})
export class ContractModule {}
