import { CreateOrdersSupplierDto } from './create-orders-supplier.dto';
declare const UpdateOrdersSupplierDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOrdersSupplierDto>>;
export declare class UpdateOrdersSupplierDto extends UpdateOrdersSupplierDto_base {
    readonly id_order_sup: number;
    readonly id_storage: number;
    readonly id_tyre: number;
    readonly id_wheel: number;
    readonly id_oil: number;
    readonly id_battery: number;
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
export {};
