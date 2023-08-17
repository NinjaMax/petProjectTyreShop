export class CreateAnswerDto {
  readonly id_answer: number;
  readonly id_question: number;
  readonly description: string;
  readonly name: string;
  readonly email: string;
  readonly profile_pictures: string;

  readonly id_user: number;
  readonly full_name: string;
  readonly phone: bigint;
  readonly password: string;
  readonly picture: string;
  readonly id_contract: number;
  readonly balance: number;
}
