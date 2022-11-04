import { Column, DataType, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import { Orders } from '../../orders/entities/order.model';
import { Users } from "src/users/entities/users.model";
import { CommentsConfigAttr } from '../interfaces/comments.interface';
import { OrdersSupplier } from "src/orders-suppliers/entities/orders-supplier.model";
import { Sales } from "src/sales/entities/sale.entity";

@Table({tableName: 'comment' })
export class Comments extends Model<Comments, CommentsConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_comment: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    comments: string;

    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER})
    id_user: number;

    @ForeignKey(() => Orders)
    @Column({type: DataType.INTEGER})
    id_order: number;

    @ForeignKey(() => OrdersSupplier)
    @Column({type: DataType.INTEGER})
    id_order_sup: number;

    @ForeignKey(() => Sales)
    @Column({type: DataType.INTEGER})
    id_sale: number;

    @BelongsTo(() => Users, 'id_user')
    user: Users;

    @BelongsTo(() => Orders, 'id_order')
    order: Orders;

    @BelongsTo(() => OrdersSupplier, 'id_order_sup')
    order_sup: OrdersSupplier;

    @BelongsTo(() => Sales, 'id_sales')
    sales: Sales;
 
}
