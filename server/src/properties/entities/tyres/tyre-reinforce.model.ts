import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "src/tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "src/properties/interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_reinforce' , updatedAt: false, createdAt: false})
export class TyreReinforce extends Model<TyreReinforce, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_reinforce: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    reinforce: string;

    @HasMany(() => Tyres , 'id_reinforce')
    tyres: Tyres[];
    
}   