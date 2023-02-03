import { Column, DataType, Model, Table, HasMany, HasOne} from "sequelize-typescript";
import { CustomerConfigAttr } from "../interfaces/customer.interfaces";
import { ReviewTyres } from "src/reviews/entities/review-tyres.model";
import { Orders } from "src/orders/entities/order.model";
import { Basket } from "src/basket/entities/basket.model";
//import { Comments } from "src/comments/entities/comment.model";
import { Contract } from "src/contract/entities/contract.model";

@Table({tableName: 'customer', createdAt: false, updatedAt: false})
export class Customer extends Model<Customer, CustomerConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, autoIncrement: true, primaryKey: true})
    id_customer: number;
    
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    full_name: string;

    @Column({type: DataType.BIGINT, unique: true, allowNull: false})
    phone: bigint;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    email: string;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    adress: string;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    delivery: string;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    token: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false, defaultValue: 'customer'})
    role: string;

    @HasMany(() => ReviewTyres , 'id_customer')
    reviews: ReviewTyres[];

    @HasOne(() => Basket, 'id_customer')
    basket: Basket;

    @HasMany(() => Orders , 'id_customer')
    orders: Orders[];

    //@HasMany(() => Comments, 'id_customer')
    //comments: Comments[];

    @HasMany(() => Contract, 'id_customer')
    contract: Contract[];

}
