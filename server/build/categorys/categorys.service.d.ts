import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.model';
export declare class CategorysService {
    private categoryRepository;
    constructor(categoryRepository: typeof Category);
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    createCategoryFromPrice(id: number, category: string): Promise<void>;
    createCategoryWheelFromPrice(id: number, category: string): Promise<void>;
    findAllCategory(): Promise<Category[]>;
    findCatById(getCategoryDto: GetCategoryDto): Promise<Category>;
    update(id: number, updateCategoryDto: UpdateCategoryDto): string;
    removeCategory(getCategoryDto: GetCategoryDto): Promise<number>;
}
