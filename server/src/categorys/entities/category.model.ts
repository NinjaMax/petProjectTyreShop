import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Tyres } from "src/tyres/entities/tyres.model";
import { CategoryConfigAttr } from '../interfaces/category.interface';

@Table({tableName: 'Category', createdAt: false, updatedAt: false })
export class Category extends Model<Category, CategoryConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_cat: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    category: string;

    @HasMany(() => Tyres, 'id_cat')
    tyres: Tyres[];
    
}
