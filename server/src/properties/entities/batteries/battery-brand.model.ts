import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Battery } from "../../../batteries/entities/battery.model";

@Table({tableName: 'battery_brand' , updatedAt: false, createdAt: false})
export class BatteryBrand extends Model<BatteryBrand > {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_brand: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    brand: string;

    @HasMany(() => Battery , 'id_brand')
    battery: Battery[];

    // @HasMany(() => , 'id_brand')
    // ratings: [];

    // @HasMany(() => , 'id_brand')
    // reviews: [];
    
}