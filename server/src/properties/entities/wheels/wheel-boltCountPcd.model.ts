import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "src/wheels/entities/wheel.model"; 
import { WheelPropsConfigAttr } from "src/properties/interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_bolt_count_pcd' , updatedAt: false, createdAt: false})
export class WheelBoltCountPcd extends Model<WheelBoltCountPcd, WheelPropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_bolt_count_pcd: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    bolt_count_pcd: string;

    @HasMany(() => Wheel, 'id_bolt_count_pcd')
    wheels: Wheel[];
    
}