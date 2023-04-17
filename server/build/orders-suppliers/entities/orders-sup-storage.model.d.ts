import { Model } from "sequelize-typescript";
import { Storage } from "../../storage/entities/storage.model";
import { OrdersSupStorConfigAttr } from '../interfaces/orders-sup-stor.interface';
import { OrdersSupplier } from "./orders-supplier.model";
export declare class OrdersSupStorage extends Model<OrdersSupStorage, OrdersSupStorConfigAttr> {
    id_order_sup_storage: number;
    id: number;
    quantity: number;
    price_wholesale: number;
    price: number;
    total: number;
    notes: string;
    id_supplier: number;
    id_storage: number;
    storage_index: number;
    id_order_sup: number;
    order_sup_index: number;
    id_order: number;
    storage: Storage;
    order_sup: OrdersSupplier;
}
