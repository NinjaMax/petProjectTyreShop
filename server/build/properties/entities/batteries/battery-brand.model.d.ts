import { Model } from "sequelize-typescript";
import { Battery } from "../../../batteries/entities/battery.model";
export declare class BatteryBrand extends Model<BatteryBrand> {
    id_brand: number;
    brand: string;
    battery: Battery[];
}
