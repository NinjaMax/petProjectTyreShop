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
}
