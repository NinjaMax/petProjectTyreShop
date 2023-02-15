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
import { Contract } from "src/contract/entities/contract.model";

@Table({tableName: 'suppliers' , updatedAt: false})
export class Supplier extends Model<Supplier, SuppliersConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_supplier: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    city: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    city_ua: string;

    @Column({type: DataType.BIGINT, unique: false, allowNull: true})
    phone: bigint;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    email: string;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    delivery: string[];

    @HasMany(() => StockTyres, 'id_supplier')
    stock_tyres: StockTyres[];

    @HasMany(() => StockWheels, 'id_supplier')
    stock_wheels: StockWheels[];

    @HasMany(() => StockBatteries, 'id_supplier')
    stock_batteries: StockBatteries[];

    @HasMany(() => StockOils, 'id_supplier')
    stock_oils: StockOils[];

    @HasMany(() => PriceTyres, 'id_supplier')
    price_tyres: PriceTyres[];

    @HasMany(() => PriceWheels, 'id_supplier')
    price_wheels: PriceWheels[];

    @HasMany(() => PriceBatteries, 'id_supplier')
    price_batteries: PriceBatteries[];

    @HasMany(() => PriceOil, 'id_supplier')
    price_oils: PriceOil[];

    @HasMany(() => OrdersSupplier, 'id_supplier')
    orders_sup: OrdersSupplier[];

    @HasMany(() => Contract, 'id_supplier')
    contract: Contract[];

}
