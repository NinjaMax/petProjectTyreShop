import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewDto } from './create-review.dto';

export class UpdateReviewDto extends PartialType(CreateReviewDto) {

    readonly id_tyres: number;
    readonly id_review: number;
    readonly discription: string;

}
