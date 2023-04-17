import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategorysController {
    private readonly categorysService;
    constructor(categorysService: CategorysService);
    create(createCategoryDto: CreateCategoryDto): Promise<import("./entities/category.model").Category>;
    findAll(): Promise<import("./entities/category.model").Category[]>;
    findOne(getCategoryDto: GetCategoryDto): Promise<import("./entities/category.model").Category>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): string;
    remove(getCategoryDto: GetCategoryDto): Promise<number>;
}
