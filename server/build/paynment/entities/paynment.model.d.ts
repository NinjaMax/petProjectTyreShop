import { Model } from 'sequelize-typescript';
import { PaynmentConfigAttr } from '../interfaces/paynment.interface';
import { Cashbox } from '../../cashbox/entities/cashbox.model';
import { Contract } from '../../contract/entities/contract.model';
import { Expense } from '../../expenses/entities/expense.model';
import { Incomes } from '../../incomes/entities/income.model';
import { OrdersSupplier } from '../../orders-suppliers/entities/orders-supplier.model';
import { Orders } from '../../orders/entities/order.model';
export declare class Paynment extends Model<Paynment, PaynmentConfigAttr> {
    id_paynment: number;
    price: number;
    notes: string;
    status: string;
    id_cashbox: number;
    id_order: number;
    id_order_sup: number;
    id_contract: number;
    id_income: number;
    id_expense: number;
    expenses: Expense;
    cashbox: Cashbox;
    order: Orders;
    order_sup: OrdersSupplier;
    incomes: Incomes;
    contract: Contract;
}
