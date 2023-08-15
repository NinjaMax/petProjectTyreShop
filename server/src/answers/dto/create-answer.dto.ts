export class CreateAnswerDto {
  readonly id_answer: number;
  readonly id_question: number;
  readonly description: string;
  readonly name: string;
  readonly email: string;
  readonly profile_pictures: string;
}
