import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "src/tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "src/properties/interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_size_digits' , updatedAt: false, createdAt: false})
export class TyreSizeDigits extends Model<TyreSizeDigits, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_size_digits: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    size_only_digits: string;

    @HasMany(() => Tyres , 'id_size_digits')
    tyres: Tyres[];
    
}