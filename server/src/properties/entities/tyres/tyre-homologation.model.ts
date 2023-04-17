import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";

@Table({tableName: 'tyre_homologation' , updatedAt: false, createdAt: false})
export class TyreHomologation extends Model<TyreHomologation, TyrePropsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_homologation: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    homologation: string;

    @HasMany(() => Tyres , 'id_homologation')
    tyres: Tyres[];

}