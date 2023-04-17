import { CreatePaynmentDto } from './dto/create-paynment.dto';
import { GetPaynmentDto } from './dto/get-paynment.dto';
import { UpdatePaynmentDto } from './dto/update-paynment.dto';
import { Paynment } from './entities/paynment.model';
import { CashboxService } from '../cashbox/cashbox.service';
import { ContractService } from '../contract/contract.service';
import { ExpensesService } from '../expenses/expenses.service';
import { IncomesService } from '../incomes/incomes.service';
import { OrdersSuppliersService } from '../orders-suppliers/orders-suppliers.service';
import { OrdersService } from '../orders/orders.service';
export declare class PaynmentService {
    private paynmentRepository;
    private orderService;
    private ordersSupService;
    private cashboxService;
    private expensesService;
    private incomesService;
    private contractService;
    constructor(paynmentRepository: typeof Paynment, orderService: OrdersService, ordersSupService: OrdersSuppliersService, cashboxService: CashboxService, expensesService: ExpensesService, incomesService: IncomesService, contractService: ContractService);
    createPaynment(createPaynmentDto: CreatePaynmentDto): Promise<Paynment>;
    findAllPaynment(): Promise<Paynment[]>;
    findPaynmentById(getPaynmentDto: GetPaynmentDto): Promise<Paynment>;
    update(id: number, updatePaynmentDto: UpdatePaynmentDto): string;
    removePaynment(getPaynmentDto: GetPaynmentDto): Promise<number>;
}
