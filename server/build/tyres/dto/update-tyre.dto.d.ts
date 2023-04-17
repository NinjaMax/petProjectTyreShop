import { CreateTyreDto } from './create-tyre.dto';
declare const UpdateTyreDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTyreDto>>;
export declare class UpdateTyreDto extends UpdateTyreDto_base {
    readonly id: number;
    readonly id_goods_provider: number;
    readonly full_name: string;
    readonly photo_url: string;
    readonly update_date: Date;
}
export {};
