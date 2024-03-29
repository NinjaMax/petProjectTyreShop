import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    readonly id_cat: number;
    readonly category: string;
    readonly chapter: string;
}
