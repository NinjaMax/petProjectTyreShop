import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "src/tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "src/properties/interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_silent' , updatedAt: false, createdAt: false})
export class TyreSilent extends Model<TyreSilent, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_silent: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    silent: string;

    @HasMany(() => Tyres , 'id_silent')
    tyres: Tyres[];
    
}