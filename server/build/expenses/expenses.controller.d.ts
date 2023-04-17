import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseDto } from './dto/get-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    create(createExpenseDto: CreateExpenseDto): Promise<import("./entities/expense.model").Expense>;
    findAll(): Promise<import("./entities/expense.model").Expense[]>;
    findOne(getExpenseDto: GetExpenseDto): Promise<import("./entities/expense.model").Expense>;
    update(id: string, updateExpenseDto: UpdateExpenseDto): string;
    remove(getExpenseDto: GetExpenseDto): Promise<number>;
}
