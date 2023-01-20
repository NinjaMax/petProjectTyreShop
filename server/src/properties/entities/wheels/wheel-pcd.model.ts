import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "src/wheels/entities/wheel.model"; 
import { WheelPropsConfigAttr } from "src/properties/interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_pcd' , updatedAt: false, createdAt: false})
export class WheelPcd extends Model<WheelPcd, WheelPropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_pcd: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    pcd: string;

    @HasMany(() => Wheel, 'id_pcd')
    wheels: Wheel[];
    
}