import { Column, DataType, Model, Table, BelongsTo, BelongsToMany, ForeignKey, HasMany} from "sequelize-typescript";
import {SalesConfigAttr} from "../interfaces/sales-interface";
import { Orders } from "src/orders/entities/order.model";
import { Users } from "src/users/entities/users.model";
import { Comments } from "src/comments/entities/comment.model";
import { SaleStorage } from "./sales-storage.model";
import { Storage } from "src/storage/entities/storage.model";

@Table({tableName: 'sale'})
export class Sales extends Model<Sales, SalesConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, autoIncrement: true, primaryKey: true})
    id_sale: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false, defaultValue: "NEW"})
    status: string;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    notes: string;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    delivery: string;

    @ForeignKey(() => Orders)
    @Column({type: DataType.INTEGER})
    id_order: number;

    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER})
    id_user: number;

    @BelongsTo( () => Users , 'id_user')
    user: Users;

    @BelongsTo( () => Orders , 'id_order')
    order: Orders;

    @HasMany( () => Comments, 'id_sale')
    comments: Comments[];

    @HasMany(() => SaleStorage, 'id_sale')
    sales_storage: Storage[];
}

