import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaynmentService } from './paynment.service';
import { PaynmentController } from './paynment.controller';
import { Paynment } from './entities/paynment.model';
import { AuthModule } from '../auth/auth.module';
import { CashboxModule } from '../cashbox/cashbox.module';
import { Cashbox } from '../cashbox/entities/cashbox.model';
import { ContractModule } from '../contract/contract.module';
import { Expense } from '../expenses/entities/expense.model';
import { ExpensesModule } from '../expenses/expenses.module';
import { Incomes } from '../incomes/entities/income.model';
import { IncomesModule } from '../incomes/incomes.module';
import { OrdersSupplier } from '../orders-suppliers/entities/orders-supplier.model';
import { OrdersSuppliersModule } from '../orders-suppliers/orders-suppliers.module';
import { Orders } from '../orders/entities/order.model';
import { OrdersModule } from '../orders/orders.module';
import { Paytype } from '../paytypes/entities/paytype.entity';
import { PaytypesModule } from '../paytypes/paytypes.module';

@Module({
  controllers: [PaynmentController],
  providers: [PaynmentService],
  imports: [
    SequelizeModule.forFeature([
      Paynment,
      Orders,
      OrdersSupplier,
      Cashbox,
      Expense,
      Incomes,
      Paytype,
    ]),
    OrdersModule,
    OrdersSuppliersModule,
    CashboxModule,
    ExpensesModule,
    IncomesModule,
    ContractModule,
    AuthModule,
    PaytypesModule,
  ],
  exports: [PaynmentService],
})
export class PaynmentModule {}
