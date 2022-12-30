import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "src/tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "src/properties/interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_season' , updatedAt: false, createdAt: false})
export class TyreSeason extends Model<TyreSeason, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_season: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    season: string;

    @HasMany(() => Tyres , 'id_season')
    tyres: Tyres[];
    
}
