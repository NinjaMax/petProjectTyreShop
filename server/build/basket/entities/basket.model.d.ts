import { Model } from 'sequelize-typescript';
import { Orders } from '../../orders/entities/order.model';
import { BasketConfigAttr } from '../interfaces/basket.interface';
import { Customer } from '../../customers/entities/customer.model';
import { Users } from '../../users/entities/users.model';
export declare class Basket extends Model<Basket, BasketConfigAttr> {
    id_basket: number;
    id_cat: number;
    id_goods: number;
    goods: string;
    quantity: number;
    price: number;
    total: number;
    notes: string;
    id_user: number;
    id_customer: number;
    user: Users;
    customer: Customer;
    order: Orders;
}
