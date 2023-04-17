import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseDto } from './dto/get-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.model';
export declare class ExpensesService {
    private expenseRepository;
    constructor(expenseRepository: typeof Expense);
    createExpense(createExpenseDto: CreateExpenseDto): Promise<Expense>;
    findAllExpense(): Promise<Expense[]>;
    findExpenseById(getExpenseDto: GetExpenseDto): Promise<Expense>;
    update(id: number, updateExpenseDto: UpdateExpenseDto): string;
    removeExpense(getExpenseDto: GetExpenseDto): Promise<number>;
}
