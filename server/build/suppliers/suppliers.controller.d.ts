import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { GetSupplierDto } from './dto/get-supplier.dto';
export declare class SuppliersController {
    private readonly suppliersService;
    constructor(suppliersService: SuppliersService);
    create(createSupplierDto: CreateSupplierDto): Promise<import("./entities/supplier.model").Supplier>;
    findAll(): Promise<import("./entities/supplier.model").Supplier[]>;
    findOne(getSupplierDto: GetSupplierDto): Promise<import("./entities/supplier.model").Supplier>;
    update(updateSupplierDto: UpdateSupplierDto): Promise<import("./entities/supplier.model").Supplier>;
    remove(getSupplierDto: GetSupplierDto): Promise<number>;
}
