import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_color' , updatedAt: false, createdAt: false})
export class WheelColor extends Model<WheelColor, WheelPropsConfigAttr> {

    @Column({type: DataType.STRING, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_color: string;

    //@Column({type: DataType.INTEGER, unique: true, allowNull: true})
    //color_id: number;
   
    @Column({type: DataType.STRING, allowNull: true})
    color: string;

    @Column({type: DataType.STRING, allowNull: true})
    color_short: string;

    @HasMany(() => Wheel, 'id_color')
    wheels: Wheel[];
    
}