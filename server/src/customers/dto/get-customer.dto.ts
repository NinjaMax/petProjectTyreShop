export class GetCustomerDto {
  readonly id_customer: number;
  readonly name: string;
  readonly full_name: string;
  readonly phone: bigint;
  readonly email: string;
  readonly id_contract: number;
  readonly balance: number;
}
