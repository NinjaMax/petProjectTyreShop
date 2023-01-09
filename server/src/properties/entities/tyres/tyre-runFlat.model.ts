import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "src/tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "src/properties/interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_run_flat' , updatedAt: false, createdAt: false})
export class TyreRunFlat extends Model<TyreRunFlat, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_run_flat: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    run_flat: string;

    @HasMany(() => Tyres , 'id_run_flat')
    tyres: Tyres[];
    
}