import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_season' , updatedAt: false, createdAt: false})
export class TyreSeason extends Model<TyreSeason, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_season: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    season: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    season_ua: string;

    @HasMany(() => Tyres , 'id_season')
    tyres: Tyres[];
    
}
