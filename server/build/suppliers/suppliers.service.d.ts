import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { GetSupplierDto } from './dto/get-supplier.dto';
import { Supplier } from './entities/supplier.model';
import { ContractService } from '../contract/contract.service';
export declare class SuppliersService {
    private suppliersRepository;
    private contractService;
    constructor(suppliersRepository: typeof Supplier, contractService: ContractService);
    createSupplier(createSupplierDto: CreateSupplierDto): Promise<Supplier>;
    createSupplierFromPrice(id_supplier: number, name: string, city: string, city_ua: string): Promise<import("../contract/entities/contract.model").Contract | Supplier>;
    findAllSupplier(): Promise<Supplier[]>;
    findSupplierById(getSupplierDto: GetSupplierDto): Promise<Supplier>;
    findSupplierByIdPrice(id_supplier: number): Promise<Supplier>;
    findSupplierTitle(getSupplierDto: GetSupplierDto): Promise<Supplier>;
    updateSupplier(updateSupplierDto: UpdateSupplierDto): Promise<Supplier>;
    removeSupplier(getSupplierDto: GetSupplierDto): Promise<number>;
}
