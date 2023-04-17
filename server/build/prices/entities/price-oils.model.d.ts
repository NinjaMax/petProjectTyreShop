import { Model } from "sequelize-typescript";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { PriceOilsConfigAttr } from "../interfaces/price-oils.interface";
import { Oil } from "../../oils/entities/oil.model";
import { Storage } from "../../storage/entities/storage.model";
export declare class PriceOil extends Model<PriceOil, PriceOilsConfigAttr> {
    id: number;
    id_oil: number;
    price_wholesale: number;
    price: number;
    id_supplier: number;
    id_storage: number;
    delivery_price: number;
    price_plus_delivery: number;
    update_date: Date;
    oil: Oil;
    supplier: Supplier;
    storage: Storage;
}
