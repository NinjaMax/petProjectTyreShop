import { Column, DataType, Model, Table, BelongsTo, ForeignKey, HasMany} from "sequelize-typescript";
import { Category } from "src/categorys/entities/category.model";
import { PriceWheels } from "src/prices/entities/price-wheels.model";
import { WheelBoltCount } from "src/properties/entities/wheels/wheel-boltCount.model";
import { WheelBoltCountPcd } from "src/properties/entities/wheels/wheel-boltCountPcd.model";
import { WheelBrand } from "src/properties/entities/wheels/wheel-brand.model";
import { WheelColor } from "src/properties/entities/wheels/wheel-color.model";
import { WheelDia } from "src/properties/entities/wheels/wheel-dia.model";
import { WheelDiameter } from "src/properties/entities/wheels/wheel-diameter.model";
import { WheelEt } from "src/properties/entities/wheels/wheel-et.model";
import { WheelModel } from "src/properties/entities/wheels/wheel-model.model";
import { WheelPcd } from "src/properties/entities/wheels/wheel-pcd.model";
import { WheelPcd2 } from "src/properties/entities/wheels/wheel-pcd2.model";
import { WheelSizeDigits } from "src/properties/entities/wheels/wheel-sizeDigits.model";
import { WheelType } from "src/properties/entities/wheels/wheel-type.model";
import { WheelWidth } from "src/properties/entities/wheels/wheel-width.model";
import { StockWheels } from "src/stock/entities/stock-wheels.model";
import { WheelConfigAttr } from '../interfaces/wheel.interface';

@Table({tableName: 'wheel', updatedAt: false})
export class Wheel extends Model<Wheel, WheelConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    full_name: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    full_name_color: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    full_name_hotline: string;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER})
    id_cat: number;

    @Column({type: DataType.DATE, unique: false, allowNull: false})
    update_date: Date;

    @ForeignKey(() => WheelBrand)
    @Column({type: DataType.INTEGER})
    id_brand: number;

    @ForeignKey(() => WheelModel)
    @Column({type: DataType.INTEGER})
    id_model: number;

    @ForeignKey(() => WheelBoltCount)
    @Column({type: DataType.INTEGER})
    id_bolt_count: number;

    @ForeignKey(() => WheelBoltCountPcd)
    @Column({type: DataType.INTEGER})
    id_bolt_count_pcd: number;

    @ForeignKey(() => WheelColor)
    @Column({type: DataType.INTEGER})
    id_color: number;

    @ForeignKey(() => WheelDia)
    @Column({type: DataType.INTEGER})
    id_dia: number;

    @ForeignKey(() => WheelDiameter)
    @Column({type: DataType.INTEGER})
    id_diameter: number;

    @ForeignKey(() => WheelEt)
    @Column({type: DataType.INTEGER})
    id_et: number;

    @ForeignKey(() => WheelPcd)
    @Column({type: DataType.INTEGER})
    id_pcd: number;

    @ForeignKey(() => WheelPcd2)
    @Column({type: DataType.INTEGER})
    id_pcd2: number;

    @ForeignKey(() => WheelSizeDigits)
    @Column({type: DataType.INTEGER})
    id_size_digits: number;

    @ForeignKey(() => WheelType)
    @Column({type: DataType.INTEGER})
    id_type: number;

    @ForeignKey(() => WheelWidth)
    @Column({type: DataType.INTEGER})
    id_width: number;

    @BelongsTo(() => Category, 'id_cat')
    category: Category;

    @HasMany(() => StockWheels , 'id')
    stock: StockWheels[];

    @HasMany(() => PriceWheels , 'id')
    price: PriceWheels[];

    @BelongsTo(() => WheelBrand, 'id_brand')
    brand: WheelBrand;

    @BelongsTo(() => WheelModel, 'id_model')
    model: WheelModel;

    @BelongsTo(() => WheelBoltCount, 'id_bolt_count')
    bolt_count: WheelBoltCount;

    @BelongsTo(() => WheelBoltCountPcd, 'id_bolt_count_pcd')
    bolt_count_pcd: WheelBoltCountPcd;

    @BelongsTo(() => WheelColor, 'id_color')
    color: WheelColor;

    @BelongsTo(() => WheelDia, 'id_dia')
    dia: WheelDia;

    @BelongsTo(() => WheelDiameter, 'id_diameter')
    diameter: WheelDiameter;

    @BelongsTo(() => WheelEt, 'id_et')
    et: WheelEt;

    @BelongsTo(() => WheelPcd, 'id_pcd')
    pcd: WheelPcd;

    @BelongsTo(() => WheelPcd2, 'id_pcd2')
    pcd2: WheelPcd2;

    @BelongsTo(() => WheelSizeDigits, 'id_size_digits')
    size_digits: WheelSizeDigits;

    @BelongsTo(() => WheelType, 'id_type')
    type: WheelType;

    @BelongsTo(() => WheelWidth, 'id_width')
    width: WheelWidth;
   
}
