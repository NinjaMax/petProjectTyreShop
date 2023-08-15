import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewDto } from './dto/get-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CustomersService } from '../customers/customers.service';
import { ReviewStore } from './entities/review-store.model';

@Injectable()
export class ReviewsStoreService {
  constructor(
    @InjectModel(ReviewStore) private reviewStoreRepository: typeof ReviewStore,
    private customersService: CustomersService,
  ) {}

  async createReviewStore(createReviewDto: CreateReviewDto) {
    try {
      const customer = await this.customersService.findCustomerById(
        createReviewDto,
      );
      const reviewStoreCreate = await this.reviewStoreRepository.create(
        createReviewDto,
      );
      // const newReview = await this.reviewStoreRepository.findByPk(
      //   reviewStoreCreate.id_review_store,
      //   { include: { all: true } },
      // );

      if (customer) {
        await reviewStoreCreate.$add('customer', customer.id_customer);
      }
      reviewStoreCreate.reload();
      return reviewStoreCreate;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllReviewsStore() {
    try {
      const reviewStoreAll = await this.reviewStoreRepository.findAll({
        include: { all: true },
      });

      return reviewStoreAll;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findReviewStoreById(getReviewDto: GetReviewDto) {
    try {
      const reviewStoreId = await this.reviewStoreRepository.findByPk(
        getReviewDto.id_review,
        { include: { all: true } },
      );

      return reviewStoreId;
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

  async removeReviewStore(getReviewDto: GetReviewDto) {
    try {
      const removeReview = await this.reviewStoreRepository.destroy({
        where: { id_review_store: getReviewDto.id_review },
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
