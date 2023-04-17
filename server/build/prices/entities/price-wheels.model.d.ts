import { Model } from "sequelize-typescript";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { PriceWheelsConfigAttr } from "../interfaces/price-wheels.interface";
import { Storage } from "../../storage/entities/storage.model";
import { Wheel } from "../../wheels/entities/wheel.model";
export declare class PriceWheels extends Model<PriceWheels, PriceWheelsConfigAttr> {
    id: number;
    id_wheel: number;
    price_wholesale: number;
    price: number;
    id_supplier: number;
    id_storage: number;
    delivery_price: number;
    price_plus_delivery: number;
    update_date: Date;
    wheel: Wheel;
    supplier: Supplier;
    storage: Storage;
}
