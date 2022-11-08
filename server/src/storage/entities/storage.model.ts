import { Column, DataType, Model, Table, BelongsTo, ForeignKey, BelongsToMany, HasMany} from "sequelize-typescript";
import { StorageConfigAttr } from '../interfaces/storage.interface';
import { OrdersSupplier } from "src/orders-suppliers/entities/orders-supplier.model";
import { Orders } from "src/orders/entities/order.model";
import { OrderStorage } from "src/orders/entities/order-storage.model";
import { Sales } from "src/sales/entities/sale.model";
import { StockTyres } from "src/stock/entities/stock-tyres.model";
import { StockWheels } from "src/stock/entities/stock-wheels.model";
import { StockBatteries } from "src/stock/entities/stock-batteries.model";
import { StockOils } from "src/stock/entities/stock-oils.model";

@Table({tableName: 'storage' , createdAt: false, updatedAt: false})
export class Storage extends Model<Storage, StorageConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_storage: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false, defaultValue: "Supplier Storage"})
    storage: string;

    @ForeignKey(() => OrdersSupplier)
    @Column({type: DataType.BIGINT, unique: true, allowNull: true})
    id_order_sup: number;

    @BelongsTo(() => OrdersSupplier , 'id_sup')
    order_sup: OrdersSupplier;

    @BelongsToMany(() => Orders, () => OrderStorage)
    orders: Orders[];

    @BelongsToMany(() => Sales, () => OrderStorage)
    sales: Sales[];

    @HasMany(() => StockTyres)
    stock_tyres: StockTyres;

    @HasMany(() => StockWheels)
    stock_wheels: StockWheels;

    @HasMany(() => StockBatteries)
    stock_batteries: StockBatteries;

    @HasMany(() => StockOils)
    stock_oils: StockOils;

}
