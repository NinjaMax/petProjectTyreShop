import { Model } from "sequelize-typescript";
import { CashboxConfigAttr } from "../interfaces/cashbox.interface";
import { Paynment } from "../../paynment/entities/paynment.model";
export declare class Cashbox extends Model<Cashbox, CashboxConfigAttr> {
    id_cashbox: number;
    cashbox: string;
    funds: number;
    paynment: Paynment[];
}
