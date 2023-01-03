import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "src/wheels/entities/wheel.model"; 
import { WheelPropsConfigAttr } from "src/properties/interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_diameter' , updatedAt: false, createdAt: false})
export class WheelDiameter extends Model<WheelDiameter, WheelPropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_diameter: number;
   
    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    diameter: number;

    @HasMany(() => Wheel, 'id_diameter')
    wheels: Wheel[];
    
}