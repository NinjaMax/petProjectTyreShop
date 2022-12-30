import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "src/wheels/entities/wheel.model"; 
import { WheelPropsConfigAttr } from "src/properties/interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_width' , updatedAt: false, createdAt: false})
export class WheelWidth extends Model<WheelWidth, WheelPropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_width: number;
   
    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    width: number;

    @HasMany(() => Wheel, 'id_wheel_width')
    wheels: Wheel[];
    
}