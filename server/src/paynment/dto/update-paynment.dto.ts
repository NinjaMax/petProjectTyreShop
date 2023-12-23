import { PartialType } from '@nestjs/mapped-types';
import { CreatePaynmentDto } from './create-paynment.dto';

export class UpdatePaynmentDto extends PartialType(CreatePaynmentDto) {
  readonly id_paynment: number;
  readonly type_paynment: string;
  readonly price: number;
  readonly notes: string;
  readonly status: string;
  readonly id_tyre: number;
  readonly id_wheel: number;
  readonly id_oil: number;
  readonly id_battery: number;
  readonly id_payviews: number;
  readonly id_paytype: number;
  readonly id_order: number;
  readonly id_order_sup: number;
  readonly id_contract: number;
  readonly id_cashbox: number;
  readonly organisation: string;
}
