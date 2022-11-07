import { Column, DataType, Model, Table, BelongsTo, ForeignKey, HasMany} from "sequelize-typescript";
import { Category } from "src/categorys/entities/category.model";
import { PriceWheels } from "src/prices/entities/price-wheels.model";
import { StockWheels } from "src/stock/entities/stock-wheels.model";
import { WheelConfigAttr } from '../interfaces/wheel.interface';

@Table({tableName: 'wheel', createdAt: false})
export class Wheel extends Model<Wheel, WheelConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_wheel: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    full_name: string;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER})
    id_cat: number;

    @BelongsTo(() => Category, 'id_cat')
    category: Category;

    @HasMany(() => StockWheels , 'id_wheel')
    stock: StockWheels[];

    @HasMany(() => PriceWheels , 'id_wheel')
    price: PriceWheels[];
   
}
