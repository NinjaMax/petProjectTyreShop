import { CreateOrderDto } from './create-order.dto';
declare const UpdateOrderDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOrderDto>>;
export declare class UpdateOrderDto extends UpdateOrderDto_base {
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
    readonly id_basket: number;
    readonly id_order_storage: number;
    readonly n: number;
    readonly id: number;
    readonly id_user: number;
    readonly id_supplier: number;
}
export {};
