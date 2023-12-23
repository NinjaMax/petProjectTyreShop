export class CreateCustomerDto {
  readonly id_customer: number;
  readonly id_user: number;
  readonly name: string;
  readonly password: string;
  readonly full_name: string;
  readonly address: string;
  readonly phone: bigint;
  readonly email: string;
  readonly id_contract: number;
  readonly balance: number;
  readonly picture: string;
  readonly delivery_city_ref: string;
  readonly delivery_dep: string;
  readonly delivery_dep_ref: string;
  readonly ref_city_delivery: string;
}
