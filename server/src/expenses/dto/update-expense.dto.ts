import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseDto } from './create-expense.dto';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {

    readonly id_expense: number;
    readonly expense: string;
    readonly price: number;
    readonly notes: string;
    readonly status: string;
}
