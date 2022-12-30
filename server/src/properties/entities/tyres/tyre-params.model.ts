import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "src/tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "src/properties/interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_params' , updatedAt: false, createdAt: false})
export class TyreParams extends Model<TyreParams, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true})
    id_params: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    params: string;

    @HasMany(() => Tyres , 'id_params')
    tyres: Tyres[];
    
}