import { CashboxService } from './cashbox.service';
import { CreateCashboxDto } from './dto/create-cashbox.dto';
import { GetCashboxDto } from './dto/get-cashbox.dto';
import { UpdateCashboxDto } from './dto/update-cashbox.dto';
export declare class CashboxController {
    private readonly cashboxService;
    constructor(cashboxService: CashboxService);
    create(createCashboxDto: CreateCashboxDto): Promise<import("./entities/cashbox.model").Cashbox>;
    findAll(): Promise<import("./entities/cashbox.model").Cashbox[]>;
    findOne(getCashboxDto: GetCashboxDto): Promise<import("./entities/cashbox.model").Cashbox>;
    update(id: string, updateCashboxDto: UpdateCashboxDto): string;
    remove(getCashboxDto: GetCashboxDto): Promise<number>;
}
