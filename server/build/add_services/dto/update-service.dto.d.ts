import { CreateServiceDto } from './create-service.dto';
declare const UpdateServiceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateServiceDto>>;
export declare class UpdateServiceDto extends UpdateServiceDto_base {
    readonly id_service: string;
    readonly service: string;
    readonly price: number;
    readonly notes: string;
}
export {};
