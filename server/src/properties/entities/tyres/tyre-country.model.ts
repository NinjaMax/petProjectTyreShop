import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_country' , updatedAt: false, createdAt: false})
export class TyreCountry extends Model<TyreCountry, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_country: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    country_manufacturer: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    country_manufacturer_ua: string;

    @HasMany(() => Tyres , 'id_country')
    tyres: Tyres[];
    
}