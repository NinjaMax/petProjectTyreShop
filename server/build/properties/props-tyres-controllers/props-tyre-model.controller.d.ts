import { PropsModelService } from '../props-tyres-services/props-tyre-model.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
export declare class PropertiesModelController {
    private readonly propertiesModelService;
    constructor(propertiesModelService: PropsModelService);
    create(createPropertyDto: CreatePropertyDto): Promise<import("../entities/tyres/tyre-model.model").TyreModel>;
    findAll(): Promise<import("../entities/tyres/tyre-model.model").TyreModel[]>;
    findOne(getPropertyDto: GetPropertyDto): Promise<import("../entities/tyres/tyre-model.model").TyreModel>;
    update(updatePropertyDto: UpdatePropertyDto): Promise<import("../entities/tyres/tyre-model.model").TyreModel | import("@nestjs/common").HttpException>;
    remove(getPropertyDto: GetPropertyDto): Promise<number>;
}
