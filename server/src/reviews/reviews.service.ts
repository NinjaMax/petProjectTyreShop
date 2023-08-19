import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
import { ReviewWheels } from './entities/review-wheels.model';
import { WheelsService } from '../wheels/wheels.service';
import { PropsWheelBrandService } from 'src/properties/props-wheel-services/props-wheel-brand.service';
import { PropsWheelModelService } from 'src/properties/props-wheel-services/props-wheel-model.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(ReviewTyres) private reviewTyresRepository: typeof ReviewTyres,
    @InjectModel(ReviewWheels)
    private reviewWheelsRepository: typeof ReviewWheels,
    private ratingsService: RatingsService,
    private tyresService: TyresService,
    private wheelsService: WheelsService,
    private wheelBrandService: PropsWheelBrandService,
    private wheelModelService: PropsWheelModelService,
    private tyreBrandService: PropsBrandService,
    private tyreModelService: PropsModelService,
    private customersService: CustomersService,
  ) {}

  async createReview(createReviewDto: CreateReviewDto) {
    try {
      const tyre = await this.tyresService.findTyresById(createReviewDto);
      const tyreModel = await this.tyreModelService.findModelById(
        createReviewDto,
      );
      const tyreBrand = await this.tyreBrandService.findBrandById(
        createReviewDto,
      );
      const customer = await this.customersService.findCustomerById(
        createReviewDto,
      );

      if (tyre && tyreModel && tyreBrand) {
        const reviewCreate = await this.reviewTyresRepository.create(
          createReviewDto,
        );
        const ratingCreate = await this.ratingsService.createRating(
          createReviewDto,
        );
        const newReview = await this.reviewTyresRepository.findByPk(
          reviewCreate.id_review,
          { include: { all: true } },
        );

        await tyre.$add('reviews', [reviewCreate.id_review]);
        await tyre.$add('rating', [ratingCreate.id_rating]);
        await tyreModel.$add('reviews', [reviewCreate.id_review]);
        await tyreModel.$add('ratings', [ratingCreate.id_rating]);
        await tyreBrand.$add('reviews', [reviewCreate.id_review]);
        await tyreBrand.$add('ratings', [ratingCreate.id_rating]);
        await newReview.$set('rating', ratingCreate.id_rating);
        if (customer) {
          await reviewCreate.$add('customer', customer.id_customer);
        }
        newReview.rating = ratingCreate;

        tyre.reviews.push(reviewCreate);
        tyre.rating.push(ratingCreate);

        tyreModel.reviews.push(reviewCreate);
        tyreModel.ratings.push(ratingCreate);

        tyreBrand.reviews.push(reviewCreate);
        tyreBrand.ratings.push(ratingCreate);

        reviewCreate.reload();
        return reviewCreate;
      }

      return new HttpException(
        'Data id: tyres or model or brand not found',
        HttpStatus.NOT_FOUND,
      );
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createReviewWheel(createReviewDto: CreateReviewDto) {
    try {
      const wheel = await this.wheelsService.findWheelById(createReviewDto);
      const wheelModel = await this.wheelModelService.findWheelModelById(
        createReviewDto,
      );
      const wheelBrand = await this.wheelBrandService.findWheelBrandById(
        createReviewDto,
      );
      const customer = await this.customersService.findCustomerById(
        createReviewDto,
      );

      if (wheel && wheelModel && wheelBrand) {
        const reviewWheelCreate = await this.reviewWheelsRepository.create(
          createReviewDto,
        );
        const ratingWheelCreate = await this.ratingsService.createRatingWheel(
          createReviewDto,
        );
        const newReviewWheel = await this.reviewWheelsRepository.findByPk(
          reviewWheelCreate.id_review,
          { include: { all: true } },
        );

        await wheel.$add('reviews', [reviewWheelCreate.id_review]);
        await wheel.$add('rating', [ratingWheelCreate.id_rating]);
        await wheelModel.$add('reviews', [reviewWheelCreate.id_review]);
        await wheelModel.$add('ratings', [ratingWheelCreate.id_rating]);
        await wheelBrand.$add('reviews', [reviewWheelCreate.id_review]);
        await wheelBrand.$add('ratings', [ratingWheelCreate.id_rating]);
        await newReviewWheel.$set('rating', ratingWheelCreate.id_rating);
        if (customer) {
          await reviewWheelCreate.$add('customer', customer.id_customer);
        }
        newReviewWheel.rating = ratingWheelCreate;

        wheel.reviews.push(reviewWheelCreate);
        wheel.rating.push(ratingWheelCreate);

        wheelModel.reviews.push(reviewWheelCreate);
        wheelModel.ratings.push(ratingWheelCreate);

        wheelBrand.reviews.push(reviewWheelCreate);
        wheelBrand.ratings.push(ratingWheelCreate);

        reviewWheelCreate.reload();
        return reviewWheelCreate;
      }

      return new HttpException(
        'Data id: tyres or model or brand not found',
        HttpStatus.NOT_FOUND,
      );
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllReviews() {
    try {
      const reviewTyresAll = await this.reviewTyresRepository.findAll({
        include: { all: true },
      });

      return reviewTyresAll;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllReviewsWheel() {
    try {
      const reviewWheelsAll = await this.reviewWheelsRepository.findAll({
        include: { all: true },
      });

      return reviewWheelsAll;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findReviewById(getReviewDto: GetReviewDto) {
    try {
      const reviewId = await this.reviewTyresRepository.findByPk(
        getReviewDto.id_review,
        { include: { all: true } },
      );

      return reviewId;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findReviewWheelById(getReviewDto: GetReviewDto) {
    try {
      const reviewWheelId = await this.reviewWheelsRepository.findByPk(
        getReviewDto.id_review,
        { include: { all: true } },
      );

      return reviewWheelId;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async countReviewByIdBrand(id_brand: number) {
    try {
      const reviewIdBrand = await this.reviewTyresRepository.count({
        where: { id_brand: id_brand },
      });
      return reviewIdBrand;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async countReviewWheelByIdBrand(id_brand: number) {
    try {
      const reviewWheelIdBrand = await this.reviewWheelsRepository.count({
        where: { id_brand: id_brand },
      });
      return reviewWheelIdBrand;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async countReviewByIdModel(id_model: number) {
    try {
      const reviewIdModel = await this.reviewTyresRepository.count({
        where: { id_model: id_model },
      });
      return reviewIdModel;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async countReviewWheelByIdModel(id_model: number) {
    try {
      const reviewWheelIdModel = await this.reviewWheelsRepository.count({
        where: { id_model: id_model },
      });
      return reviewWheelIdModel;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async countLikeByIdReview(updateReviewDto: UpdateReviewDto) {
    try {
      const reviewIdReview = await this.reviewTyresRepository.findByPk(
        updateReviewDto.id_review,
      );
      if (reviewIdReview) {
        if (updateReviewDto.likeCount === 1) {
          await reviewIdReview.increment('like_count');
        } else if (updateReviewDto.likeCount === -1) {
          await reviewIdReview.decrement('like_count');
        }
        reviewIdReview.reload();
        if (updateReviewDto.dislikeCount === 1) {
          await reviewIdReview.increment('dislike_count');
        } else if (updateReviewDto.dislikeCount === -1) {
          await reviewIdReview.decrement('dislike_count');
        }
        await reviewIdReview.reload();
        return reviewIdReview;
      } else {
        return null;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async countLikeByIdReviewWheel(updateReviewDto: UpdateReviewDto) {
    try {
      const reviewIdReviewWheel = await this.reviewWheelsRepository.findByPk(
        updateReviewDto.id_review,
      );
      if (reviewIdReviewWheel) {
        if (updateReviewDto.likeCount === 1) {
          await reviewIdReviewWheel.increment('like_count');
        } else if (updateReviewDto.likeCount === -1) {
          await reviewIdReviewWheel.decrement('like_count');
        }
        reviewIdReviewWheel.reload();
        if (updateReviewDto.dislikeCount === 1) {
          await reviewIdReviewWheel.increment('dislike_count');
        } else if (updateReviewDto.dislikeCount === -1) {
          await reviewIdReviewWheel.decrement('dislike_count');
        }
        await reviewIdReviewWheel.reload();
        return reviewIdReviewWheel;
      } else {
        return null;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  async removeReview(getReviewDto: GetReviewDto) {
    try {
      const removeReview = await this.reviewTyresRepository.destroy({
        where: { id_review: getReviewDto.id_review },
      });

      return removeReview;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
