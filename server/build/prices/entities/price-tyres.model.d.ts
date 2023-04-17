import { Model } from "sequelize-typescript";
import { Tyres } from "../../tyres/entities/tyres.model";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { PriceTyresConfigAttr } from "../interfaces/price-tyres.interface";
import { Storage } from "../../storage/entities/storage.model";
export declare class PriceTyres extends Model<PriceTyres, PriceTyresConfigAttr> {
    id: number;
    id_tyre: number;
    price_wholesale: number;
    price: number;
    id_supplier: number;
    id_storage: number;
    delivery_price: number;
    price_plus_delivery: number;
    update_date: Date;
    tyres: Tyres;
    supplier: Supplier;
    storage: Storage;
}
