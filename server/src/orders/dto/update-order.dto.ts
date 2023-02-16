import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    
    readonly id_tyre: number;
    readonly id_wheel: number;
    readonly id_oil: number;
    readonly id_battery: number;
    readonly price: number;
    readonly quantity: number;
    readonly total: number;
    readonly notes: string;
    readonly reserve: number;
    readonly status: string;
    //readonly price_wholesale: number;
    readonly id_basket: number;
    readonly id_order_storage: number;
    //readonly delivery_price: number;
    //readonly price_plus_delivery: number;
    //readonly update_date: Date;
    readonly n: number;
    readonly id: number;
    readonly id_user: number;
    readonly id_supplier: number;
    //readonly full_name: string;
    //readonly name: string;
    //readonly city: string;
    //readonly phone: bigint;
    //readonly email: string;

}
