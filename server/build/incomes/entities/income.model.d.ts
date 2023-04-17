import { Model } from "sequelize-typescript";
import { IncomeConfigAttr } from '../interfaces/income.interface';
import { Paynment } from '../../paynment/entities/paynment.model';
export declare class Incomes extends Model<Incomes, IncomeConfigAttr> {
    id_income: number;
    income: string;
    notes: string;
    paynment: Paynment[];
}
