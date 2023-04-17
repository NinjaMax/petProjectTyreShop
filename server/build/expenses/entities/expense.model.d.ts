import { Model } from "sequelize-typescript";
import { ExpenseConfigAttr } from '../interfaces/expense.interface';
import { Paynment } from "../../paynment/entities/paynment.model";
export declare class Expense extends Model<Expense, ExpenseConfigAttr> {
    id_expense: number;
    expense: string;
    price: number;
    notes: string;
    status: string;
    paynment: Paynment[];
}
