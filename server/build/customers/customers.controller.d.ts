import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomerDto } from './dto/get-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    createCustomer(createCustomerDto: CreateCustomerDto): Promise<import("./entities/customer.model").Customer>;
    findAllCustomer(): Promise<import("./entities/customer.model").Customer[]>;
    findCustomerById(getCustomerDto: GetCustomerDto): Promise<import("./entities/customer.model").Customer>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): string;
    removeCustomer(getCustomerDto: GetCustomerDto): Promise<number>;
}
