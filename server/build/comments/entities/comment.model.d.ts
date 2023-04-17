import { Model } from 'sequelize-typescript';
import { Orders } from '../../orders/entities/order.model';
import { CommentsConfigAttr } from '../interfaces/comments.interface';
import { OrdersSupplier } from '../../orders-suppliers/entities/orders-supplier.model';
import { Sales } from '../../sales/entities/sale.model';
import { Users } from '../../users/entities/users.model';
export declare class Comments extends Model<Comments, CommentsConfigAttr> {
    id_comment: number;
    comments: string;
    id_user: number;
    id_order: number;
    id_order_sup: number;
    id_sale: number;
    user: Users;
    order: Orders;
    order_sup: OrdersSupplier;
    sales: Sales;
}
