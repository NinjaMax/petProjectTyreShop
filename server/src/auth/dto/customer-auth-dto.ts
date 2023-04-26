export class CustomerAuthDto {
  readonly id_customer: number;
  readonly name: string;
  readonly email: string;
  readonly full_name: string;
  readonly password: string;
  readonly address: string;
  readonly picture: string;
  readonly phone: bigint;
}
