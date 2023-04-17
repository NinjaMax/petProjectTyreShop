import { HttpException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewDto } from './dto/get-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewTyres } from './entities/review-tyres.model';
import { CustomersService } from '../customers/customers.service';
import { PropsBrandService } from '../properties/props-tyres-services/props-tyre-brand.service';
import { PropsModelService } from '../properties/props-tyres-services/props-tyre-model.service';
import { RatingsService } from '../ratings/ratings.service';
import { TyresService } from '../tyres/tyres.service';
export declare class ReviewsService {
    private reviewTyresRepository;
    private ratingsService;
    private tyresService;
    private tyreBrandService;
    private tyreModelService;
    private customersService;
    constructor(reviewTyresRepository: typeof ReviewTyres, ratingsService: RatingsService, tyresService: TyresService, tyreBrandService: PropsBrandService, tyreModelService: PropsModelService, customersService: CustomersService);
    createReview(createReviewDto: CreateReviewDto): Promise<ReviewTyres | HttpException>;
    findAllReviews(): Promise<ReviewTyres[]>;
    findReviewById(getReviewDto: GetReviewDto): Promise<ReviewTyres>;
    update(id: number, updateReviewDto: UpdateReviewDto): string;
    removeReview(getReviewDto: GetReviewDto): Promise<number>;
}
