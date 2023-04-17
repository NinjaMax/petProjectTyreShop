import { PaynmentService } from './paynment.service';
import { CreatePaynmentDto } from './dto/create-paynment.dto';
import { GetPaynmentDto } from './dto/get-paynment.dto';
import { UpdatePaynmentDto } from './dto/update-paynment.dto';
export declare class PaynmentController {
    private readonly paynmentService;
    constructor(paynmentService: PaynmentService);
    create(createPaynmentDto: CreatePaynmentDto): Promise<import("./entities/paynment.model").Paynment>;
    findAll(): Promise<import("./entities/paynment.model").Paynment[]>;
    findOne(getPaynmentDto: GetPaynmentDto): Promise<import("./entities/paynment.model").Paynment>;
    update(id: string, updatePaynmentDto: UpdatePaynmentDto): string;
    remove(getPaynmentDto: GetPaynmentDto): Promise<number>;
}
