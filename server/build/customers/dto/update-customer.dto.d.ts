import { CreateCustomerDto } from './create-customer.dto';
declare const UpdateCustomerDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCustomerDto>>;
export declare class UpdateCustomerDto extends UpdateCustomerDto_base {
    readonly id_customer: number;
    readonly name: string;
    readonly full_name: string;
    readonly phone: bigint;
    readonly email: string;
    readonly id_contract: number;
    readonly balance: number;
}
export {};
