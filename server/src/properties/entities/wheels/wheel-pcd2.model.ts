import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "src/wheels/entities/wheel.model"; 
import { WheelPropsConfigAttr } from "src/properties/interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_pcd2' , updatedAt: false, createdAt: false})
export class WheelPcd2 extends Model<WheelPcd2, WheelPropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_pcd2: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    pcd2: string;

    @HasMany(() => Wheel, 'id_pcd2')
    wheels: Wheel[];
    
}