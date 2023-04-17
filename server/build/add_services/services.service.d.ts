import { CreateServiceDto } from './dto/create-service.dto';
import { GetServiceDto } from './dto/get-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.model';
export declare class ServicesService {
    private servicesRepository;
    constructor(servicesRepository: typeof Service);
    createService(createServiceDto: CreateServiceDto): Promise<Service>;
    findAllService(): Promise<Service[]>;
    findServiceById(getServiceDto: GetServiceDto): Promise<Service>;
    update(id: number, updateServiceDto: UpdateServiceDto): string;
    removeService(getServiceDto: GetServiceDto): Promise<number>;
}
