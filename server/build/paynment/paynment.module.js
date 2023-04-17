var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let PaynmentModule = class PaynmentModule {
};
PaynmentModule = __decorate([
    Module({
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
], PaynmentModule);
export { PaynmentModule };
