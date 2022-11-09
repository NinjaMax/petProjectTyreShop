import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomeDto } from './create-income.dto';

export class UpdateIncomeDto extends PartialType(CreateIncomeDto) {

    readonly id_income: number;
    readonly income: string;
    readonly notes: string;

}
