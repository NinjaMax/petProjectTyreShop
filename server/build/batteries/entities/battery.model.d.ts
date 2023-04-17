import { Model } from 'sequelize-typescript';
import { BatteryConfigAttr } from '../interfaces/batteries.interface';
import { Category } from '../../categorys/entities/category.model';
import { PriceBatteries } from '../../prices/entities/price-battery.model';
import { StockBatteries } from '../../stock/entities/stock-batteries.model';
export declare class Battery extends Model<Battery, BatteryConfigAttr> {
    id: number;
    full_name: string;
    id_cat: number;
    category: Category;
    price: PriceBatteries[];
    stock: StockBatteries[];
}
