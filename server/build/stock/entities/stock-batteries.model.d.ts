import { Model } from "sequelize-typescript";
import { StockBatteriesConfigAttr } from "../interfaces/stock-batteries.interface";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Battery } from "../../batteries/entities/battery.model";
import { Storage } from "../../storage/entities/storage.model";
export declare class StockBatteries extends Model<StockBatteries, StockBatteriesConfigAttr> {
    id: number;
    id_battery: number;
    stock: number;
    reserve: number;
    remainder: number;
    id_supplier: number;
    id_storage: number;
    update_date: Date;
    battery: Battery;
    supplier: Supplier;
    storage: Storage;
}
