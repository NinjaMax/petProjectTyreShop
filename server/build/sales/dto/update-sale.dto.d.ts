import { CreateSaleDto } from './create-sale.dto';
declare const UpdateSaleDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSaleDto>>;
export declare class UpdateSaleDto extends UpdateSaleDto_base {
    readonly id_sale: number;
    readonly id: number;
    readonly id_tyre: number;
    readonly id_wheel: number;
    readonly id_oil: number;
    readonly id_battery: number;
    readonly status: string;
    readonly quantity: number;
    readonly price: number;
    readonly total: number;
    readonly id_storage: number;
    readonly delivery: string;
    readonly id_sales_storage: number;
}
export {};
