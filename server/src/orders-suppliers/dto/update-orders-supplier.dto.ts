import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdersSupplierDto } from './create-orders-supplier.dto';

export class UpdateOrdersSupplierDto extends PartialType(CreateOrdersSupplierDto) {

    readonly id_goods: number;
    readonly id_cat: number;
    readonly goods: string;
    readonly price: number;
    readonly count: number;
    readonly notes: string;
    readonly total: number;

}
