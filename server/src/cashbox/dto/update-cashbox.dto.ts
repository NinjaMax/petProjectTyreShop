import { PartialType } from '@nestjs/mapped-types';
import { CreateCashboxDto } from './create-cashbox.dto';

export class UpdateCashboxDto extends PartialType(CreateCashboxDto) {

    readonly id_cashbox: number;
    readonly cashbox: string;
    readonly amount: number;
}