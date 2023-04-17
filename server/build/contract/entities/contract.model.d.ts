import { Model } from 'sequelize-typescript';
import { ContractConfigAttr } from '../interfaces/contract.interface';
import { Customer } from '../../customers/entities/customer.model';
import { Paynment } from '../../paynment/entities/paynment.model';
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Users } from '../../users/entities/users.model';
export declare class Contract extends Model<Contract, ContractConfigAttr> {
    id_contract: number;
    name: string;
    balance: number;
    id_user: number;
    id_customer: number;
    id_supplier: number;
    user: Users;
    customer: Customer;
    supplier: Supplier;
    paynment: Paynment;
}
