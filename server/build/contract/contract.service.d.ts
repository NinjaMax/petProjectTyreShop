import { CreateContractDto } from './dto/create-contract.dto';
import { GetContractDto } from './dto/get-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Contract } from './entities/contract.model';
export declare class ContractService {
    private contractRepository;
    constructor(contractRepository: typeof Contract);
    createContract(createContractDto: CreateContractDto): Promise<Contract>;
    createContractFromPrice(id_supplier: number, name: string): Promise<Contract>;
    findAllContract(): Promise<Contract[]>;
    findContractById(getContractDto: GetContractDto): Promise<Contract>;
    findAllContractByCustomer(getContractDto: GetContractDto): Promise<Contract[]>;
    update(id: number, updateContractDto: UpdateContractDto): string;
    removeContract(getContractDto: GetContractDto): Promise<number>;
}
