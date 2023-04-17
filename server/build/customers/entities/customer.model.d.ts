import { Model } from 'sequelize-typescript';
import { CustomerConfigAttr } from '../interfaces/customer.interfaces';
import { Basket } from '../../basket/entities/basket.model';
import { Contract } from '../../contract/entities/contract.model';
import { Orders } from '../../orders/entities/order.model';
import { ReviewTyres } from '../../reviews/entities/review-tyres.model';
export declare class Customer extends Model<Customer, CustomerConfigAttr> {
    id_customer: number;
    name: string;
    full_name: string;
    phone: bigint;
    email: string;
    adress: string;
    delivery: string;
    token: string;
    role: string;
    reviews: ReviewTyres[];
    basket: Basket;
    orders: Orders[];
    contract: Contract[];
}
