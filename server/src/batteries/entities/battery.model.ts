import { Column, DataType, Model, Table, BelongsTo, HasMany, ForeignKey} from "sequelize-typescript";
import { Category } from "src/categorys/entities/category.model";
import { PriceBatteries } from "src/prices/entities/price-battery.model";
import { StockBatteries } from "src/stock/entities/stock-batteries.model";
import { BatteryConfigAttr } from '../interfaces/batteries.interface';

@Table({tableName: 'batterie', createdAt: false})
export class Battery extends Model<Battery, BatteryConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_battery: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    full_name: string;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER})
    id_cat: number;

    @BelongsTo(() => Category, 'id_cat')
    category: Category;

    @HasMany(() => PriceBatteries , 'id_battery')
    price: PriceBatteries[];

    @HasMany(() => StockBatteries, 'id_battery')
    stock: StockBatteries[];
    
}
