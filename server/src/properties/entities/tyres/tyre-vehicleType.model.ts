import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_vehicle_type' , updatedAt: false, createdAt: false})
export class TyreVehicleType extends Model<TyreVehicleType, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_vehicle_type: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    vehicle_type: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    vehicle_type_ua: string;

    @HasMany(() => Tyres , 'id_vehicle_type')
    tyres: Tyres[];
    
}