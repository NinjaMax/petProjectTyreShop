import { Model } from "sequelize-typescript";
import { Sales } from "../../sales/entities/sale.model";
import { Orders } from '../../orders/entities/order.model';
import { ServicesConfigAttr } from '../interfaces/services.interface';
export declare class Service extends Model<Service, ServicesConfigAttr> {
    id_service: number;
    service: string;
    price: number;
    notes: string;
    orders: Orders[];
    sales: Sales[];
}
