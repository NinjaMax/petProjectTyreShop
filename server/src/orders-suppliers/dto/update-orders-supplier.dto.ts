import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdersSupplierDto } from './create-orders-supplier.dto';

export class UpdateOrdersSupplierDto extends PartialType(CreateOrdersSupplierDto) {

    readonly id_order_sup: number;
    readonly id_storage: number;
    //readonly id_cat: number;
    //readonly goods: string;
    readonly price: number;
    readonly notes: string;
    readonly total: number;

    readonly id_order: number;
    readonly id_basket: number;
    
    readonly reserve: number;
    readonly quantity: number;
    readonly price_wholesale: number;
    readonly order_sup_index: number;
    readonly storage_index: number;
}
