import { Model } from "sequelize-typescript";
import { StockWheelsConfigAttr } from "../interfaces/stock-wheels.interface";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Storage } from "../../storage/entities/storage.model";
import { Wheel } from "../../wheels/entities/wheel.model";
export declare class StockWheels extends Model<StockWheels, StockWheelsConfigAttr> {
    id: number;
    id_wheel: number;
    stock: number;
    reserve: number;
    remainder: number;
    id_supplier: number;
    id_storage: number;
    update_date: Date;
    wheel: Wheel;
    supplier: Supplier;
    storage: Storage;
}
