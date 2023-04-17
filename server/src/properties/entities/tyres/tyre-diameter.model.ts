import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_diameter' , updatedAt: false, createdAt: false})
export class TyreDiameter extends Model<TyreDiameter, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_diameter: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    diameter: string;

    @HasMany(() => Tyres , 'id_diameter')
    tyres: Tyres[];
    
}