import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  readonly id_customer: number;
  readonly name: string;
  readonly full_name: string;
  readonly phone: bigint;
  readonly email: string;
  readonly id_contract: number;
  readonly password: string;
  readonly balance: number;
  readonly address: string;
  readonly delivery: string;
}
