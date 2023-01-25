import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "src/wheels/entities/wheel.model"; 
import { WheelPropsConfigAttr } from "src/properties/interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_bolt_count' , updatedAt: false, createdAt: false})
export class WheelBoltCount extends Model<WheelBoltCount, WheelPropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_bolt_count: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    bolt_count: string;

    @HasMany(() => Wheel, 'id_bolt_count')
    wheels: Wheel[];
    
}