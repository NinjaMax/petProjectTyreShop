import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { Sales } from "src/sales/entities/sale.model";
import { Orders } from '../../orders/entities/order.model';

import { ServicesConfigAttr } from '../interfaces/services.interface';

@Table({tableName: 'service', createdAt: false, updatedAt: false })
export class Service extends Model<Service, ServicesConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_service: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    service: string;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    price: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    notes: string;

    @HasMany(() => Orders, 'id_basket')
    orders: Orders[];

    @HasMany(() => Sales, 'id_basket')
    sales: Sales[];
    
}
