import { RatingsService } from './ratings.service';
import { GetRatingDto } from './dto/get-rating.dto';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
export declare class RatingsController {
    private readonly ratingsService;
    constructor(ratingsService: RatingsService);
    create(createRatingDto: CreateRatingDto): Promise<import("./entities/rating-tyres.model").RatingTyres>;
    findAll(): Promise<import("./entities/rating-tyres.model").RatingTyres[]>;
    findOne(getRatingDto: GetRatingDto): Promise<import("./entities/rating-tyres.model").RatingTyres>;
    update(id: string, updateRatingDto: UpdateRatingDto): string;
    remove(getRatingDto: GetRatingDto): Promise<number>;
}
