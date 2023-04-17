import { CreateStockDto } from './create-stock.dto';
declare const UpdateStockDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateStockDto>>;
export declare class UpdateStockDto extends UpdateStockDto_base {
    readonly stock: number;
    readonly reserve: number;
    readonly remainder: number;
    readonly id_tyre: number;
    readonly id_wheel: number;
    readonly id_oil: number;
    readonly id_battery: number;
    readonly update_date: Date;
}
export {};
