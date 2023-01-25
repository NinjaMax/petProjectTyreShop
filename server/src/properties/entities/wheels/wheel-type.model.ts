import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "src/wheels/entities/wheel.model"; 
import { WheelPropsConfigAttr } from "src/properties/interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_type' , updatedAt: false, createdAt: false})
export class WheelType extends Model<WheelType, WheelPropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_type: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    type: string;

    @HasMany(() => Wheel, 'id_type')
    wheels: Wheel[];
    
}