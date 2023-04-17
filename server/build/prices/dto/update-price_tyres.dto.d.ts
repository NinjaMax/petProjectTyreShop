import { CreatePriceDto } from './create-price.dto';
declare const UpdatePriceTyresDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePriceDto>>;
export declare class UpdatePriceTyresDto extends UpdatePriceTyresDto_base {
    readonly id_tyre: number;
    readonly id_wheel: number;
    readonly id_oil: number;
    readonly id_battery: number;
    readonly price_wholesale: number;
    readonly price: number;
    readonly delivery_price: number;
    readonly price_plus_delivery: number;
    readonly update_date: Date;
}
export {};
