export class GetQuestionDto {
  readonly id_question: number;
  readonly id_user: number;
  readonly id_customer: number;
  readonly id_model: number;
  readonly id_brand: number;
  readonly description: string;
  readonly name: string;
  readonly email: string;
  readonly customer_pictures: string;
}
