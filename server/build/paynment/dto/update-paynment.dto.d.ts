import { CreatePaynmentDto } from './create-paynment.dto';
declare const UpdatePaynmentDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePaynmentDto>>;
export declare class UpdatePaynmentDto extends UpdatePaynmentDto_base {
    readonly id_paynment: number;
    readonly type_paynment: string;
    readonly price: number;
    readonly notes: string;
    readonly status: string;
    readonly id_tyre: number;
    readonly id_wheel: number;
    readonly id_oil: number;
    readonly id_battery: number;
}
export {};
