import { CreateCategoryDto } from './create-category.dto';
declare const UpdateCategoryDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCategoryDto>>;
export declare class UpdateCategoryDto extends UpdateCategoryDto_base {
    readonly id_cat: number;
    readonly category: string;
}
export {};