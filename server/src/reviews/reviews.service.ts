import { Injectable,  HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RatingsService } from 'src/ratings/ratings.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewDto } from './dto/get-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewTyres } from './entities/review-tyres.model';
import { TyresService } from 'src/tyres/tyres.service';
import { PropertiesModelService } from 'src/properties/properties-model.service';
import { PropertiesBrandService } from 'src/properties/properties-brand.service';

@Injectable()
export class ReviewsService {

  constructor(@InjectModel(ReviewTyres) private reviewTyresRepository: typeof ReviewTyres,
    private ratingsService: RatingsService, 
    private tyresService: TyresService,
    private tyreBrandService: PropertiesBrandService,
    private tyreModelService: PropertiesModelService
   ) {}

  async createReview(createReviewDto: CreateReviewDto) {

    try {

      const tyre = await this.tyresService.findTyresById(createReviewDto);
      const tyreModel = await this.tyreModelService.findModelById(createReviewDto);
      const tyreBrand = await this.tyreBrandService.findBrandById(createReviewDto);
      
      if(tyre && tyreModel && tyreBrand ) {

        const reviewCreate = await this.reviewTyresRepository.create(createReviewDto);
        const ratingCreate = await this.ratingsService.createRating(createReviewDto);

        await tyre.$add('reviews', [reviewCreate.id_review]);
        await tyre.$add('rating', [ratingCreate.id_rating])
        await tyreModel.$add('reviews', [reviewCreate.id_review]);
        await tyreModel.$add('ratings', [ratingCreate.id_rating]);
        await tyreBrand.$add('reviews', [reviewCreate.id_review]);
        await tyreBrand.$add('ratings', [ratingCreate.id_rating]);
        await ratingCreate.$add('review', [reviewCreate.id_review]);

        tyreModel.reviews.push(reviewCreate);
        tyreModel.ratings.push(ratingCreate);

        tyreBrand.reviews.push(reviewCreate);
        tyreBrand.ratings.push(ratingCreate);

        tyre.reviews.push(reviewCreate);
        tyre.rating.push(ratingCreate);

        ratingCreate.review = reviewCreate;

        return reviewCreate;

      }  

      new HttpException('Data id: tyres, model, brand not found', HttpStatus.NOT_FOUND);

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
