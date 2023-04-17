import { Model } from 'sequelize-typescript';
import { Storage } from '../../storage/entities/storage.model';
import { Orders } from './order.model';
import { OrdersStorageConfigAttr } from '../interfaces/orders-storage.interface';
export declare class Order_Storage extends Model<Order_Storage, OrdersStorageConfigAttr> {
    id_order_storage: number;
    id: number;
    full_name: string;
    category: string;
    id_order: number;
    id_storage: number;
    id_supplier: number;
    order_index: number;
    storage_index: number;
    quantity: number;
    reserve: number;
    price: number;
    total: number;
    order: Orders;
    storage: Storage;
}
