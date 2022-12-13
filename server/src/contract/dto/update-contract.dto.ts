import { PartialType } from '@nestjs/mapped-types';
import { CreateContractDto } from './create-contract.dto';

export class UpdateContractDto extends PartialType(CreateContractDto) {

    readonly id_contract: number;
    readonly name: string;
    readonly balance: number;

}
