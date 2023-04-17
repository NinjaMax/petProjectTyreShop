import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_type' , updatedAt: false, createdAt: false})
export class WheelType extends Model<WheelType, WheelPropsConfigAttr> {

    @Column({type: DataType.STRING, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_type: string;
   
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    type: string;

    @HasMany(() => Wheel, 'id_type')
    wheels: Wheel[];
    
}