import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { GetContractDto } from './dto/get-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
export declare class ContractController {
    private readonly contractService;
    constructor(contractService: ContractService);
    createContract(createContractDto: CreateContractDto): Promise<import("./entities/contract.model").Contract>;
    findAllContract(): Promise<import("./entities/contract.model").Contract[]>;
    findContractById(getContractDto: GetContractDto): Promise<import("./entities/contract.model").Contract>;
    update(id: string, updateContractDto: UpdateContractDto): string;
    removeContract(getContractDto: GetContractDto): Promise<number>;
}
