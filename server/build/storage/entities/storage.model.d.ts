import { Model } from "sequelize-typescript";
import { StorageConfigAttr } from '../interfaces/storage.interface';
import { OrdersSupStorage } from "../../orders-suppliers/entities/orders-sup-storage.model";
import { Order_Storage } from "../../orders/entities/order-storage.model";
import { PriceBatteries } from "../../prices/entities/price-battery.model";
import { PriceOil } from "../../prices/entities/price-oils.model";
import { PriceTyres } from "../../prices/entities/price-tyres.model";
import { PriceWheels } from "../../prices/entities/price-wheels.model";
import { Sales } from "../../sales/entities/sale.model";
import { StockBatteries } from "../../stock/entities/stock-batteries.model";
import { StockOils } from "../../stock/entities/stock-oils.model";
import { StockTyres } from "../../stock/entities/stock-tyres.model";
import { StockWheels } from "../../stock/entities/stock-wheels.model";
export declare class Storage extends Model<Storage, StorageConfigAttr> {
    id_storage: number;
    storage: string;
    order_sup_storage: OrdersSupStorage[];
    stock_tyres: StockTyres[];
    price_tyres: PriceTyres[];
    stock_wheels: StockWheels[];
    price_wheels: PriceWheels[];
    stock_batteries: StockBatteries[];
    price_batteries: PriceBatteries[];
    stock_oils: StockOils[];
    price_oils: PriceOil[];
    order_storage: Order_Storage[];
    sales: Sales[];
}
