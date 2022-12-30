import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "src/tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "src/properties/interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_speed_index' , updatedAt: false, createdAt: false})
export class TyreSpeedIndex extends Model<TyreSpeedIndex, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_speed_index: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    speed_index: string;

    @Column({type: DataType.STRING, unique: true, allowNull: true})
    speed_index_with_desc: string;

    @HasMany(() => Tyres , 'id_speed_index')
    tyres: Tyres[];

}