import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "src/tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "src/properties/interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_seal' , updatedAt: false, createdAt: false})
export class TyreSeal extends Model<TyreSeal, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_seal: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: true})
    seal: string;

    @HasMany(() => Tyres , 'id_seal')
    tyres: Tyres[];
    
}