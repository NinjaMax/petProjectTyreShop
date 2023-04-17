import { Model } from 'sequelize-typescript';
import { SalesConfigAttr } from '../interfaces/sales-interface';
import { Comments } from '../../comments/entities/comment.model';
import { Orders } from '../../orders/entities/order.model';
import { Storage } from '../../storage/entities/storage.model';
import { Users } from '../../users/entities/users.model';
export declare class Sales extends Model<Sales, SalesConfigAttr> {
    id_sale: number;
    status: string;
    notes: string;
    delivery: string;
    id_order: number;
    id_user: number;
    user: Users;
    order: Orders;
    comments: Comments[];
    sales_storage: Storage[];
}
