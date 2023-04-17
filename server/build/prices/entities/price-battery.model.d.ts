import { Model } from "sequelize-typescript";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { PriceBatteryConfigAttr } from "../interfaces/price-battery.interface";
import { Battery } from "../../batteries/entities/battery.model";
import { Storage } from "../../storage/entities/storage.model";
export declare class PriceBatteries extends Model<PriceBatteries, PriceBatteryConfigAttr> {
    id: number;
    id_battery: number;
    price_wholesale: number;
    price: number;
    id_supplier: number;
    id_storage: number;
    delivery_price: number;
    price_plus_delivery: number;
    update_date: Date;
    battery: Battery;
    supplier: Supplier;
    storage: Storage;
}
