import { CreateCashboxDto } from './dto/create-cashbox.dto';
import { GetCashboxDto } from './dto/get-cashbox.dto';
import { UpdateCashboxDto } from './dto/update-cashbox.dto';
import { Cashbox } from './entities/cashbox.model';
export declare class CashboxService {
    private cashboxRepository;
    constructor(cashboxRepository: typeof Cashbox);
    createCashbox(createCashboxDto: CreateCashboxDto): Promise<Cashbox>;
    findAllCashbox(): Promise<Cashbox[]>;
    findCashboxById(getCashboxDto: GetCashboxDto): Promise<Cashbox>;
    update(id: number, updateCashboxDto: UpdateCashboxDto): string;
    removeCashbox(getCashboxDto: GetCashboxDto): Promise<number>;
}
