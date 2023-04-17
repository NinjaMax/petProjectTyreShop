import { Model } from "sequelize-typescript";
import { StockOilsConfigAttr } from "../interfaces/stock-oils.interface";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Oil } from "../../oils/entities/oil.model";
import { Storage } from "../../storage/entities/storage.model";
export declare class StockOils extends Model<StockOils, StockOilsConfigAttr> {
    id: number;
    id_oil: number;
    stock: number;
    reserve: number;
    remainder: number;
    id_supplier: number;
    id_storage: number;
    update_date: Date;
    oil: Oil;
    supplier: Supplier;
    storage: Storage;
}
