import { Column, DataType, Model, Table, BelongsTo, ForeignKey, BelongsToMany, HasMany} from "sequelize-typescript";
import { StorageConfigAttr } from '../interfaces/storage.interface';
import { OrdersSupplier } from "src/orders-suppliers/entities/orders-supplier.model";
import { Orders } from "src/orders/entities/order.model";
import { Order_Storage } from "src/orders/entities/order-storage.model";
import { Sales } from "src/sales/entities/sale.model";
import { StockTyres } from "src/stock/entities/stock-tyres.model";
import { StockWheels } from "src/stock/entities/stock-wheels.model";
import { StockBatteries } from "src/stock/entities/stock-batteries.model";
import { StockOils } from "src/stock/entities/stock-oils.model";
import { PriceTyres } from "src/prices/entities/price-tyres.model";
import { PriceWheels } from "src/prices/entities/price-wheels.model";
import { PriceBatteries } from "src/prices/entities/price-battery.model";
import { PriceOil } from "src/prices/entities/price-oils.model";
import { SaleStorage } from "src/sales/entities/sales-storage.model";

@Table({tableName: 'storage' , createdAt: false, updatedAt: false})
export class Storage extends Model<Storage, StorageConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_storage: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    storage: string;

    @BelongsToMany(() => Orders, () => Order_Storage)
    orders: Orders[];

    @BelongsToMany(() => Sales, () => SaleStorage)
    sales: Sales[];

    @HasMany(() => OrdersSupplier, 'id_storage')
    order_sup: OrdersSupplier[];

    @HasMany(() => StockTyres, 'id_storage')
    stock_tyres: StockTyres[];

    @HasMany(() => PriceTyres, 'id_storage')
    price_tyres: PriceTyres[];

    @HasMany(() => StockWheels, 'id_storage')
    stock_wheels: StockWheels[];

    @HasMany(() => PriceWheels, 'id_storage')
    price_wheels: PriceWheels[];

    @HasMany(() => StockBatteries, 'id_storage')
    stock_batteries: StockBatteries[];

    @HasMany(() => PriceBatteries, 'id_storage')
    price_batteries: PriceBatteries[];

    @HasMany(() => StockOils, 'id_storage')
    stock_oils: StockOils[];

    @HasMany(() => PriceOil, 'id_storage')
    price_oils: PriceOil[];

}
