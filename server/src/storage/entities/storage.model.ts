import { Column, DataType, Model, Table, BelongsTo, ForeignKey, BelongsToMany, HasMany} from "sequelize-typescript";
import { StorageConfigAttr } from '../interfaces/storage.interface';
import { OrdersSupStorage } from "../../orders-suppliers/entities/orders-sup-storage.model";
import { Order_Storage } from "../../orders/entities/order-storage.model";
import { PriceBatteries } from "../../prices/entities/price-battery.model";
import { PriceOil } from "../../prices/entities/price-oils.model";
import { PriceTyres } from "../../prices/entities/price-tyres.model";
import { PriceWheels } from "../../prices/entities/price-wheels.model";
import { Sales } from "../../sales/entities/sale.model";
import { SaleStorage } from "../../sales/entities/sales-storage.model";
import { StockBatteries } from "../../stock/entities/stock-batteries.model";
import { StockOils } from "../../stock/entities/stock-oils.model";
import { StockTyres } from "../../stock/entities/stock-tyres.model";
import { StockWheels } from "../../stock/entities/stock-wheels.model";


@Table({tableName: 'storage', createdAt: false, updatedAt: false})
export class Storage extends Model<Storage, StorageConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_storage: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    storage: string;

    @HasMany(() => OrdersSupStorage, 'id_storage')
    order_sup_storage: OrdersSupStorage[];

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

    @HasMany(() => Order_Storage, 'id_storage')
    order_storage: Order_Storage[];

    @BelongsToMany(() => Sales, () => SaleStorage)
    sales: Sales[];

}
