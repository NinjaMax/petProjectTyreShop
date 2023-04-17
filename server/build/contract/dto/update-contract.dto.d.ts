import { CreateContractDto } from './create-contract.dto';
declare const UpdateContractDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateContractDto>>;
export declare class UpdateContractDto extends UpdateContractDto_base {
    readonly id_contract: number;
    readonly name: string;
    readonly balance: number;
}
export {};
