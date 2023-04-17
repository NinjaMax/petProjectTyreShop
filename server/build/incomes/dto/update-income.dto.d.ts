import { CreateIncomeDto } from './create-income.dto';
declare const UpdateIncomeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateIncomeDto>>;
export declare class UpdateIncomeDto extends UpdateIncomeDto_base {
    readonly id_income: number;
    readonly income: string;
    readonly notes: string;
}
export {};
