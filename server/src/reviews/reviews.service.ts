import { Injectable,  HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RatingsService } from 'src/ratings/ratings.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewDto } from './dto/get-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewTyres } from './entities/review-tyres.model';
import { TyresService } from 'src/tyres/tyres.service';

@Injectable()
export class ReviewsService {

  constructor(@InjectModel(ReviewTyres) private reviewTyresRepository: typeof ReviewTyres,
    private ratingsService: RatingsService, 
    private tyresService: TyresService,
   ) {}

  async createReview(createReviewDto: CreateReviewDto) {

    try {

      const tyres = await this.tyresService.findTyresById(createReviewDto);
      
      if(tyres) {

        const reviewCreate = await this.reviewTyresRepository.create(createReviewDto);

        const ratingCreate = await this.ratingsService.createRating(createReviewDto);

        await tyres.$add('reviews', [createReviewDto.id_tyres]);

        await ratingCreate.$add('review', [createReviewDto.id_review]);

        tyres.reviews.push(reviewCreate);

        ratingCreate.review = reviewCreate;

        return reviewCreate;

      }  

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
      
    }

  }

  async findAllReviews() {

    try {

      const reviewTyresAll = await this.reviewTyresRepository.findAll({include: {all: true}});

      return reviewTyresAll;

    } catch (error) {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findReviewById(getReviewDto: GetReviewDto) {
    try {

      const reviewId = await this.reviewTyresRepository.findByPk(getReviewDto.id_review, {include: {all: true}});

      return reviewId;


    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
      
    }
    
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async removeReview(getReviewDto: GetReviewDto) {

      try {
  
        const removeReview = await this.reviewTyresRepository.destroy({where: {id_review : getReviewDto.id_review}});
  
        return removeReview;
  
      } catch {
  
        throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
        
      }
      
  }
  
}
