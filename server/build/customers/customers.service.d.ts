import { ContractService } from '../contract/contract.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomerDto } from './dto/get-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.model';
export declare class CustomersService {
    private customersRepository;
    private contractService;
    constructor(customersRepository: typeof Customer, contractService: ContractService);
    createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer>;
    findAllCustomer(): Promise<Customer[]>;
    findCustomerById(getCustomerDto: GetCustomerDto): Promise<Customer>;
    update(id: number, updateCustomerDto: UpdateCustomerDto): string;
    removeCustomer(getCustomerDto: GetCustomerDto): Promise<number>;
}
