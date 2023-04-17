import { Model } from "sequelize-typescript";
import { UsersConfigAttr } from "../interfaces/users.interface";
import { ReviewTyres } from "../../reviews/entities/review-tyres.model";
import { Orders } from "../../orders/entities/order.model";
import { Basket } from "../../basket/entities/basket.model";
import { Comments } from "../../comments/entities/comment.model";
import { OrdersSupplier } from '../../orders-suppliers/entities/orders-supplier.model';
import { Contract } from '../../contract/entities/contract.model';
export declare class Users extends Model<Users, UsersConfigAttr> {
    id_user: number;
    name: string;
    full_name: string;
    password: string;
    delivery: string;
    phone: bigint;
    email: string;
    token: string;
    role: string;
    reviews: ReviewTyres[];
    basket: Basket;
    orders: Orders[];
    comments: Comments[];
    orders_sup: OrdersSupplier[];
    contract: Contract[];
}
