import { Model } from "sequelize-typescript";
import { OilConfigAttr } from '../interfaces/oil.interface';
import { Category } from "../../categorys/entities/category.model";
import { PriceOil } from "../../prices/entities/price-oils.model";
import { StockOils } from "../../stock/entities/stock-oils.model";
export declare class Oil extends Model<Oil, OilConfigAttr> {
    id: number;
    full_name: string;
    id_cat: number;
    category: Category;
    price: PriceOil[];
    stock: StockOils[];
}
