import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { GetServiceDto } from './dto/get-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(createServiceDto: CreateServiceDto): Promise<import("./entities/service.model").Service>;
    findAll(): Promise<import("./entities/service.model").Service[]>;
    findOne(getServiceDto: GetServiceDto): Promise<import("./entities/service.model").Service>;
    update(id: string, updateServiceDto: UpdateServiceDto): string;
    remove(getServiceDto: GetServiceDto): Promise<number>;
}
