import { CreateOilDto } from './create-oil.dto';
declare const UpdateOilDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOilDto>>;
export declare class UpdateOilDto extends UpdateOilDto_base {
    readonly id: number;
    readonly full_name: string;
}
export {};
