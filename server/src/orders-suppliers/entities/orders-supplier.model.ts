import { Column, DataType, Model, Table, BelongsTo, ForeignKey, HasMany} from "sequelize-typescript";
import { Comments } from "src/comments/entities/comment.model";
import { Orders } from "src/orders/entities/order.model";
import { Supplier } from "src/suppliers/entities/supplier.model";
import { Users } from "src/users/entities/users.model";
import { OrdersSupConfigAttr } from '../interfaces/order-sup.interface';

@Table({tableName: 'order_supplier' })
export class OrdersSupplier extends Model<OrdersSupplier, OrdersSupConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_order_sup: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    id_cat: number;
   
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    id_goods: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    goods: string;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    quantity: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    reserve: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    price: number;

    @Column({type: DataType.BIGINT, unique: false, allowNull: false, 
        set() {
            this.setDataValue('total', this.getDataValue('price') * this.getDataValue('quantity'));
        }
    })
    total: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    notes: string;

    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER})
    id_user: number;

    @ForeignKey(() => Orders)
    @Column({type: DataType.INTEGER})
    id_order: number;

    @ForeignKey(() => Supplier)
    @Column({type: DataType.INTEGER})
    id_sup: number;

    @BelongsTo(() => Users, 'id_user')
    user: Users;

    @BelongsTo(() => Orders, 'id_order')
    order: Orders;

    @BelongsTo(() => Supplier, 'id_sup')
    supplier: Supplier;

    @HasMany(() => Comments, 'id_order_sup')
    comments: Comments[];
    
}
