import { CreateRatingDto } from './dto/create-rating.dto';
import { GetRatingDto } from './dto/get-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingTyres } from './entities/rating-tyres.model';
export declare class RatingsService {
    private ratingTyresRepository;
    constructor(ratingTyresRepository: typeof RatingTyres);
    createRating(createRatingDto: CreateRatingDto): Promise<RatingTyres>;
    findAllRating(): Promise<RatingTyres[]>;
    findRatingById(getRatingDto: GetRatingDto): Promise<RatingTyres>;
    update(id: number, updateRatingDto: UpdateRatingDto): string;
    removeRating(getRatingDto: GetRatingDto): Promise<number>;
}
