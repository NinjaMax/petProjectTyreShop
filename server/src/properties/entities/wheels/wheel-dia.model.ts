import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "src/wheels/entities/wheel.model"; 
import { WheelPropsConfigAttr } from "src/properties/interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_dia' , updatedAt: false, createdAt: false})
export class WheelDia extends Model<WheelDia, WheelPropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_dia: number;
   
    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    dia: number;

    @HasMany(() => Wheel, 'id_wheel_dia')
    wheels: Wheel[];
    
}