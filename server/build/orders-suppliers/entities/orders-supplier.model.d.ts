import { Model } from "sequelize-typescript";
import { OrdersSupConfigAttr } from '../interfaces/order-sup.interface';
import { OrdersSupStorage } from "./orders-sup-storage.model";
import { Comments } from "../../comments/entities/comment.model";
import { Orders } from "../../orders/entities/order.model";
import { Paynment } from "../../paynment/entities/paynment.model";
import { Supplier } from "../../suppliers/entities/supplier.model";
import { Users } from "../../users/entities/users.model";
export declare class OrdersSupplier extends Model<OrdersSupplier, OrdersSupConfigAttr> {
    id_order_sup: number;
    delivery: string;
    status: string;
    notes: string;
    id_user: number;
    id_order: number;
    id_supplier: number;
    id_contract: number;
    user: Users;
    order: Orders;
    supplier: Supplier;
    comments: Comments[];
    paynment: Paynment[];
    orders_sup_storage: OrdersSupStorage[];
}
