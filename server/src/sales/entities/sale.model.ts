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

    @ForeignKey(() => Orders)
    @Column({type: DataType.INTEGER})
    id_order: number;

    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER})
    id_user: number;
    
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    id_goods: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    goods: string;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    quantity: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    price: number;

    @Column({type: DataType.BIGINT, unique: false, allowNull: false, 
        set() {
            this.setDataValue('total', this.getDataValue('price') * this.getDataValue('quantity'));
        }
    })
    total: number;

    @BelongsTo( () => Users , 'id_user')
    user: Users;

    @BelongsTo( () => Orders , 'id_order')
    order: Orders;

    @HasMany( () => Comments, 'id_sale')
    comments: Comments[];

    //@HasMany( () => Paynments, 'id_sale')
    //paynments: Paynments[];

    @BelongsToMany(() => Storage, () => SaleStorage)
    storage: Storage[];
}

