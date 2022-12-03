import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { SuppliersConfigAttr } from '../interfaces/suppliers.interface';
import { StockTyres } from '../../stock/entities/stock-tyres.model';
import { PriceTyres } from "src/prices/entities/price-tyres.model";
import { PriceWheels } from "src/prices/entities/price-wheels.model";
import { PriceBatteries } from "src/prices/entities/price-battery.model";
import { PriceOil } from "src/prices/entities/price-oils.model";
import { StockWheels } from "src/stock/entities/stock-wheels.model";
import { StockBatteries } from "src/stock/entities/stock-batteries.model";
import { StockOils } from "src/stock/entities/stock-oils.model";
import { OrdersSupplier } from "src/orders-suppliers/entities/orders-supplier.model";

@Table({tableName: 'suppliers' , updatedAt: false})
export class Supplier extends Model<Supplier, SuppliersConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_sup: bigint;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    city: string;

    @Column({type: DataType.BIGINT, unique: false, allowNull: true})
    phone: bigint;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    email: string;

    @HasMany(() => StockTyres, 'id_sup')
    stock_tyres: StockTyres[];

    @HasMany(() => StockWheels, 'id_sup')
    stock_wheels: StockWheels[];

    @HasMany(() => StockBatteries, 'id_sup')
    stock_batteries: StockBatteries[];

    @HasMany(() => StockOils, 'id_sup')
    stock_oils: StockOils[];

    @HasMany(() => PriceTyres, 'id_sup')
    price_tyres: PriceTyres[];

    @HasMany(() => PriceWheels, 'id_sup')
    price_wheels: PriceWheels[];

    @HasMany(() => PriceBatteries, 'id_sup')
    price_batteries: PriceBatteries[];

    @HasMany(() => PriceOil, 'id_sup')
    price_oils: PriceOil[];

    @HasMany(() => OrdersSupplier, 'id_sup')
    orders_sup: OrdersSupplier[];

}
