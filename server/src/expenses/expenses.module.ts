import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { Expense } from './entities/expense.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService],
  imports: [ 
    SequelizeModule.forFeature([Expense]),
    AuthModule
  ],
  exports: [ExpensesService]
})
export class ExpensesModule {}
