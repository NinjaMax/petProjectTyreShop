import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_size_digits' , updatedAt: false, createdAt: false})
export class WheelSizeDigits extends Model<WheelSizeDigits, WheelPropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_size_digits: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    size_only_digits: string;

    @HasMany(() => Wheel, 'id_size_digits')
    wheels: Wheel[];
    
}