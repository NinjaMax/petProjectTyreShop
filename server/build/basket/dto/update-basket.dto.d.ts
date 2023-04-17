import { CreateBasketDto } from './create-basket.dto';
declare const UpdateBasketDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBasketDto>>;
export declare class UpdateBasketDto extends UpdateBasketDto_base {
    readonly id_goods: number;
    readonly id_cat: number;
    readonly goods: string;
    readonly price: number;
    readonly quantity: number;
    readonly total: number;
    readonly notes: string;
    readonly id: number;
}
export {};
