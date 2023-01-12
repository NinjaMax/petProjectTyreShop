import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "src/tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "src/properties/interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_height' , updatedAt: false, createdAt: false})
export class TyreHeight extends Model<TyreHeight, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_height: number;
   
    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    height: number | string;

    @HasMany(() => Tyres , 'id_height')
    tyres: Tyres[];
    
}