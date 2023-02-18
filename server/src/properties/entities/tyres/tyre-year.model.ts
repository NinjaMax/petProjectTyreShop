import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "src/tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "src/properties/interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_year' , updatedAt: false, createdAt: false})
export class TyreYear extends Model<TyreYear, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_year: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    manufacture_year: string;

    @HasMany(() => Tyres , 'id_year')
    tyres: Tyres[];
    
}