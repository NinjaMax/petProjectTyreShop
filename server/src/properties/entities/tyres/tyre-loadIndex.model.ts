import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_load_index' , updatedAt: false, createdAt: false})
export class TyreLoadIndex extends Model<TyreLoadIndex, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_load_index: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    load_index: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    load_index_with_desc: string;

    @HasMany(() => Tyres , 'id_load_index')
    tyres: Tyres[];
    
}