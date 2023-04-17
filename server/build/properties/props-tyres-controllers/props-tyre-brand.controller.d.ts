import { PropsBrandService } from '../props-tyres-services/props-tyre-brand.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
export declare class PropertiesBrandController {
    private readonly propertiesBrandService;
    constructor(propertiesBrandService: PropsBrandService);
    create(createPropertyDto: CreatePropertyDto): Promise<import("../entities/tyres/tyre-brand.model").TyreBrand>;
    findAll(): Promise<import("../entities/tyres/tyre-brand.model").TyreBrand[]>;
    findOne(getPropertyDto: GetPropertyDto): Promise<import("../entities/tyres/tyre-brand.model").TyreBrand>;
    update(updatePropertyDto: UpdatePropertyDto): Promise<import("../entities/tyres/tyre-brand.model").TyreBrand | import("@nestjs/common").HttpException>;
    remove(getPropertyDto: GetPropertyDto): Promise<number>;
}
