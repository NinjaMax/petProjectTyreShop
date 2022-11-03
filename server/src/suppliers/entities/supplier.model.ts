import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { SuppliersConfigAttr } from '../interfaces/suppliers.interface';
import { StockTyres } from '../../stock/entities/stock-tyres.model';
import { PriceTyres } from "src/prices/entities/price-tyres.model";
import { PriceWheels } from "src/prices/entities/price-wheels.model";
import { PriceBatteries } from "src/prices/entities/price-battery.model";
import { PriceOil } from "src/prices/entities/price-oils.model";

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

    @HasMany(() => StockTyres , 'id_sup')
    stock: StockTyres[];

    @HasMany(() => PriceTyres, 'id_sup')
    price_tyres: PriceTyres[];

    @HasMany(() => PriceWheels, 'id_sup')
    price_wheels: PriceWheels[];

    @HasMany(() => PriceBatteries, 'id_sup')
    price_batteries: PriceBatteries[];

    @HasMany(() => PriceOil, 'id_sup')
    price_oils: PriceOil[];

}
