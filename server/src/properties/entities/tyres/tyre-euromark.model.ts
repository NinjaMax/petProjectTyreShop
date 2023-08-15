import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_euromark' , updatedAt: false, createdAt: false})
export class TyreEuromark extends Model<TyreEuromark, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_euromark: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    fuel_efficiency: string;

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    wet_traction: string;

    @Column({type: DataType.INTEGER, unique: true, allowNull: true})
    loud_level: number;

    @HasMany(() => Tyres , 'id_euromark')
    tyres: Tyres[];
    
}