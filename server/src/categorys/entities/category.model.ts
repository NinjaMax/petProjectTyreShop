import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { CategoryConfigAttr } from '../interfaces/category.interface';
import { Tyres } from "../../tyres/entities/tyres.model";
import { Wheel } from "../../wheels/entities/wheel.model";

@Table({tableName: 'category', createdAt: false, updatedAt: false })
export class Category extends Model<Category, CategoryConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_cat: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    category: string;

    @HasMany(() => Tyres, 'id_cat')
    tyres: Tyres[];

    @HasMany(() => Wheel, 'id_cat')
    wheels: Wheel[];


    
}
