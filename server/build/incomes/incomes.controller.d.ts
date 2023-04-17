import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { GetIncomeDto } from './dto/get-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
export declare class IncomesController {
    private readonly incomesService;
    constructor(incomesService: IncomesService);
    create(createIncomeDto: CreateIncomeDto): Promise<import("./entities/income.model").Incomes>;
    findAll(): Promise<import("./entities/income.model").Incomes[]>;
    findOne(getIncomeDto: GetIncomeDto): Promise<import("./entities/income.model").Incomes>;
    update(id: string, updateIncomeDto: UpdateIncomeDto): string;
    remove(getIncomeDto: GetIncomeDto): Promise<number>;
}
