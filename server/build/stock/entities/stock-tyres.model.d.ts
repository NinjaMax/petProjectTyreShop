import { Model } from "sequelize-typescript";
import { StockTyresConfigAttr } from "../interfaces/stock-tyres.interface";
import { Tyres } from "../../tyres/entities/tyres.model";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Storage } from "../../storage/entities/storage.model";
export declare class StockTyres extends Model<StockTyres, StockTyresConfigAttr> {
    id: number;
    id_tyre: number;
    stock: number;
    reserve: number;
    remainder: number;
    id_supplier: number;
    id_storage: number;
    update_date: Date;
    tyres: Tyres;
    supplier: Supplier;
    storage: Storage;
}
