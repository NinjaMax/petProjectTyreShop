import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "src/wheels/entities/wheel.model"; 
import { WheelPropsConfigAttr } from "src/properties/interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_brand' , updatedAt: false, createdAt: false})
export class WheelBrand extends Model<WheelBrand, WheelPropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_brand: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    brand: string;

    @HasMany(() => Wheel, 'id_brand')
    wheels: Wheel[];
    
}