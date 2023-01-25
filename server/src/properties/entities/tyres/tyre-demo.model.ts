import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "src/tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "src/properties/interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_demo' , updatedAt: false, createdAt: false})
export class TyreDemo extends Model<TyreDemo, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_demo: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    demo: string;

    @HasMany(() => Tyres , 'id_demo')
    tyres: Tyres[];
    
}