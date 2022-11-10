import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IncomesService } from './incomes.service';
import { IncomesController } from './incomes.controller';
import { Incomes } from './entities/income.model';

@Module({
  controllers: [IncomesController],
  providers: [IncomesService],
  imports: [ 
    SequelizeModule.forFeature([Incomes]),
  ],
  exports: [IncomesService]
})
export class IncomesModule {}
