import { Model } from "sequelize-typescript";
import { Storage } from "../../storage/entities/storage.model";
import { Sales } from "./sale.model";
export declare class SaleStorage extends Model<SaleStorage> {
    id_sales_storage: number;
    id: number;
    quantity: number;
    price: number;
    total: number;
    id_supplier: number;
    id_order: number;
    sale_index: number;
    id_sale: number;
    storage_index: number;
    id_storage: number;
    sale: Sales;
    storage: Storage;
}
