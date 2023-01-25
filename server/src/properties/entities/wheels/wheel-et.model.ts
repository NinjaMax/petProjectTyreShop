import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Wheel } from "src/wheels/entities/wheel.model"; 
import { WheelPropsConfigAttr } from "src/properties/interfaces/wheels/wheel-props.interface";

@Table({tableName: 'wheel_et' , updatedAt: false, createdAt: false})
export class WheelEt extends Model<WheelEt, WheelPropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_et: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    et: string;

    @HasMany(() => Wheel, 'id_et')
    wheels: Wheel[];
    
}