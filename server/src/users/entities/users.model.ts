import { Column, DataType, Model, Table, HasMany, HasOne} from "sequelize-typescript";
import { UsersConfigAttr } from "../interfaces/users.interface";
import { ReviewTyres } from "src/reviews/entities/review-tyres.model";
import { Orders } from "src/orders/entities/order.model";
import { Basket } from "src/basket/entities/basket.model";
import { Comments } from "src/comments/entities/comment.model";
import { OrdersSupplier } from "src/orders-suppliers/entities/orders-supplier.model";
import { Contract } from "src/contract/entities/contract.model";

@Table({tableName: 'user', createdAt: false, updatedAt: false})
export class Users extends Model<Users, UsersConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, autoIncrement: true, primaryKey: true})
    id_user: number;
    
    @Column({type: DataType.STRING, unique: false, allowNull: true})
    name: string;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    full_name: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    password: string;

    // @Column({type: DataType.STRING, unique: false, allowNull: false})
    // confirm_password: string;

    @Column({type: DataType.BIGINT, unique: true, allowNull: false})
    phone: bigint;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    email: string;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    token: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false, defaultValue: 'customer'})
    role: string;

    @HasMany(() => ReviewTyres , 'id_user')
    reviews: ReviewTyres[];

    @HasOne(() => Basket, 'id_user')
    basket: Basket;

    @HasMany(() => Orders , 'id_user')
    orders: Orders[];

    @HasMany(() => Comments, 'id_user')
    comments: Comments[];

    @HasMany(() => OrdersSupplier, 'id_user')
    orders_sup: OrdersSupplier[];

    @HasMany(() => Contract, 'id_user')
    contract: Contract[];

}
