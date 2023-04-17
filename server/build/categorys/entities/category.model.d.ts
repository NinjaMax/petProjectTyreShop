import { Model } from "sequelize-typescript";
import { CategoryConfigAttr } from '../interfaces/category.interface';
import { Tyres } from "../../tyres/entities/tyres.model";
import { Wheel } from "../../wheels/entities/wheel.model";
export declare class Category extends Model<Category, CategoryConfigAttr> {
    id_cat: number;
    category: string;
    tyres: Tyres[];
    wheels: Wheel[];
}
