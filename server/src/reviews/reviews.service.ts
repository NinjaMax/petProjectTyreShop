import { Injectable,  HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewDto } from './dto/get-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewTyres } from './entities/review-tyres.model';
import { CustomersService } from '../customers/customers.service';
import { PropsBrandService } from '../properties/props-tyres-services/props-tyre-brand.service';
import { PropsModelService } from '../properties/props-tyres-services/props-tyre-model.service';
import { RatingsService } from '../ratings/ratings.service';
import { TyresService } from '../tyres/tyres.service';



@Injectable()
export class ReviewsService {

  constructor(@InjectModel(ReviewTyres) private reviewTyresRepository: typeof ReviewTyres,
    private ratingsService: RatingsService, 
    private tyresService: TyresService,
    private tyreBrandService: PropsBrandService,
    private tyreModelService: PropsModelService,
    private customersService: CustomersService
   ) {}

  async createReview(createReviewDto: CreateReviewDto) {

    try {
      
      const tyre = await this.tyresService.findTyresById(createReviewDto);
      const tyreModel = await this.tyreModelService.findModelById(createReviewDto);
      const tyreBrand = await this.tyreBrandService.findBrandById(createReviewDto);
      const customer = await this.customersService.findCustomerById(createReviewDto);

      
      if(tyre && tyreModel && tyreBrand ) {

        const reviewCreate = await this.reviewTyresRepository.create(createReviewDto);
        const ratingCreate = await this.ratingsService.createRating(createReviewDto);
        const newReview = await this.reviewTyresRepository.findByPk(reviewCreate.id_review, {include: {all: true}});

        await tyre.$add('reviews', [reviewCreate.id_review]);
        await tyre.$add('rating', [ratingCreate.id_rating])
        await tyreModel.$add('reviews', [reviewCreate.id_review]);
        await tyreModel.$add('ratings', [ratingCreate.id_rating]);
        await tyreBrand.$add('reviews', [reviewCreate.id_review]);
        await tyreBrand.$add('ratings', [ratingCreate.id_rating]);
        await newReview.$set('rating', ratingCreate.id_rating);
        await reviewCreate.$add('customer', customer.id_customer);
        newReview.rating = ratingCreate;
        
        tyre.reviews.push(reviewCreate);
        tyre.rating.push(ratingCreate);

        tyreModel.reviews.push(reviewCreate);
        tyreModel.ratings.push(ratingCreate);

        tyreBrand.reviews.push(reviewCreate);
        tyreBrand.ratings.push(ratingCreate);

        reviewCreate.reload();

        //const getNewReview = await this.reviewTyresRepository.findByPk(reviewCreate.id_review, {include: {all: true}});

        //return getNewReview;
        return reviewCreate;

      }  

      return new HttpException('Data id: tyres or model or brand not found', HttpStatus.NOT_FOUND);

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
      
    }

  }

  async findAllReviews() {

    try {

      const reviewTyresAll = await this.reviewTyresRepository.findAll({include: {all: true}});

      return reviewTyresAll;

    } catch {

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
