import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_model' , updatedAt: false, createdAt: false})
export class WheelModel extends Model<WheelModel, WheelPropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_model: number;
   
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    model: string;

    @HasMany(() => Wheel, 'id_model')
    wheels: Wheel[];
    
}