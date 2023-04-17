import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_dia' , updatedAt: false, createdAt: false})
export class WheelDia extends Model<WheelDia, WheelPropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_dia: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    dia: string;

    @HasMany(() => Wheel, 'id_dia')
    wheels: Wheel[];
    
}