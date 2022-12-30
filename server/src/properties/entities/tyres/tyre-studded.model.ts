import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "src/tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "src/properties/interfaces/tyres/tyre-props.interface";


@Table({tableName: 'tyre_studded' , updatedAt: false, createdAt: false})
export class TyreStudded extends Model<TyreStudded, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_studded: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    studded: string;

    @HasMany(() => Tyres , 'id_studded')
    tyres: Tyres[];
    
}