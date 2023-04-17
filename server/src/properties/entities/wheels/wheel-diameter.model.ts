import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_diameter' , updatedAt: false, createdAt: false})
export class WheelDiameter extends Model<WheelDiameter, WheelPropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_diameter: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    diameter: string;

    @HasMany(() => Wheel, 'id_diameter')
    wheels: Wheel[];
    
}