export class SignupDto {
  readonly name: string;
  readonly id_user: number;
  readonly id_customer: number;
  readonly email: string;
  readonly full_name: string;
  readonly password: string;
  readonly picture: string;
  readonly phone: bigint;
  readonly id_contract: number;
  readonly balance: number;
  readonly address: string;
}
