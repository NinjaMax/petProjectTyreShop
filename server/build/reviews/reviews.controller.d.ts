import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewDto } from './dto/get-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(createReviewDto: CreateReviewDto): Promise<import("./entities/review-tyres.model").ReviewTyres | import("@nestjs/common").HttpException>;
    findAll(): Promise<import("./entities/review-tyres.model").ReviewTyres[]>;
    findOne(getReviewDto: GetReviewDto): Promise<import("./entities/review-tyres.model").ReviewTyres>;
    update(id: string, updateReviewDto: UpdateReviewDto): string;
    remove(getReviewDto: GetReviewDto): Promise<number>;
}
