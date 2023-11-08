export class LoginDto {
  readonly id_user: number;
  readonly id_customer: number;
  readonly name: string;
  readonly email: string;
  readonly full_name: string;
  readonly password: string;
  readonly picture: string;
  readonly phone: bigint;
  readonly address: string;
  readonly id_contract: number;
  readonly balance: number;
  readonly delivery: string;
  readonly delivery_city_ref: string;
  readonly delivery_dep: string;
  readonly delivery_dep_ref: string;
  readonly ref_city_delivery: string;
}
