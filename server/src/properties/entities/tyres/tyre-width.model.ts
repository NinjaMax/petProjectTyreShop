import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_width' , updatedAt: false, createdAt: false})
export class TyreWidth extends Model<TyreWidth, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_width: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    width: string;

    @HasMany(() => Tyres , 'id_width')
    tyres: Tyres[];
    
}