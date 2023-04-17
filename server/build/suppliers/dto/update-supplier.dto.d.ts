import { CreateSupplierDto } from './create-supplier.dto';
declare const UpdateSupplierDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSupplierDto>>;
export declare class UpdateSupplierDto extends UpdateSupplierDto_base {
    readonly id_supplier: number;
    readonly name: string;
    readonly city: string;
    readonly phone: bigint;
    readonly email: string;
    readonly delivery: string[];
}
export {};
