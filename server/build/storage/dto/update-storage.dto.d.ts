import { CreateStorageDto } from './create-storage.dto';
declare const UpdateStorageDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateStorageDto>>;
export declare class UpdateStorageDto extends UpdateStorageDto_base {
    readonly id_storage: number;
    readonly storage: string;
}
export {};
