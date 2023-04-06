import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaynmentService } from './paynment.service';
import { PaynmentController } from './paynment.controller';
import { Paynment } from './entities/paynment.model';
import { Orders } from 'src/orders/entities/order.model';
import { OrdersSupplier } from 'src/orders-suppliers/entities/orders-supplier.model';
import { Cashbox } from 'src/cashbox/entities/cashbox.model';
import { Expense } from 'src/expenses/entities/expense.model';
import { Incomes } from 'src/incomes/entities/income.model';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersSuppliersModule } from 'src/orders-suppliers/orders-suppliers.module';
import { CashboxModule } from 'src/cashbox/cashbox.module';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { IncomesModule } from 'src/incomes/incomes.module';
import { ContractModule } from 'src/contract/contract.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PaynmentController],
  providers: [PaynmentService],
  imports: [ 
    SequelizeModule.forFeature([Paynment, Orders, OrdersSupplier,
    Cashbox, Expense, Incomes]),
    OrdersModule, OrdersSuppliersModule, CashboxModule, ExpensesModule,
    IncomesModule, ContractModule, AuthModule
  ],
  exports: [PaynmentService]
})
export class PaynmentModule {}
