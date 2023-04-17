import { CreateCashboxDto } from './create-cashbox.dto';
declare const UpdateCashboxDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCashboxDto>>;
export declare class UpdateCashboxDto extends UpdateCashboxDto_base {
    readonly id_cashbox: number;
    readonly cashbox: string;
    readonly funds: number;
}
export {};
