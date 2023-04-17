import { CreateIncomeDto } from './dto/create-income.dto';
import { GetIncomeDto } from './dto/get-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Incomes } from './entities/income.model';
export declare class IncomesService {
    private incomeRepository;
    constructor(incomeRepository: typeof Incomes);
    createIncome(createIncomeDto: CreateIncomeDto): Promise<Incomes>;
    findAllIncome(): Promise<Incomes[]>;
    findIncomeById(getIncomeDto: GetIncomeDto): Promise<Incomes>;
    update(id: number, updateIncomeDto: UpdateIncomeDto): string;
    removeIncome(getIncomeDto: GetIncomeDto): Promise<number>;
}
