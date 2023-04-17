var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReviewTyres } from './entities/review-tyres.model';
import { CustomersService } from '../customers/customers.service';
import { PropsBrandService } from '../properties/props-tyres-services/props-tyre-brand.service';
import { PropsModelService } from '../properties/props-tyres-services/props-tyre-model.service';
import { RatingsService } from '../ratings/ratings.service';
import { TyresService } from '../tyres/tyres.service';
let ReviewsService = class ReviewsService {
    constructor(reviewTyresRepository, ratingsService, tyresService, tyreBrandService, tyreModelService, customersService) {
        this.reviewTyresRepository = reviewTyresRepository;
        this.ratingsService = ratingsService;
        this.tyresService = tyresService;
        this.tyreBrandService = tyreBrandService;
        this.tyreModelService = tyreModelService;
        this.customersService = customersService;
    }
    createReview(createReviewDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tyre = yield this.tyresService.findTyresById(createReviewDto);
                const tyreModel = yield this.tyreModelService.findModelById(createReviewDto);
                const tyreBrand = yield this.tyreBrandService.findBrandById(createReviewDto);
                const customer = yield this.customersService.findCustomerById(createReviewDto);
                if (tyre && tyreModel && tyreBrand) {
                    const reviewCreate = yield this.reviewTyresRepository.create(createReviewDto);
                    const ratingCreate = yield this.ratingsService.createRating(createReviewDto);
                    const newReview = yield this.reviewTyresRepository.findByPk(reviewCreate.id_review, { include: { all: true } });
                    yield tyre.$add('reviews', [reviewCreate.id_review]);
                    yield tyre.$add('rating', [ratingCreate.id_rating]);
                    yield tyreModel.$add('reviews', [reviewCreate.id_review]);
                    yield tyreModel.$add('ratings', [ratingCreate.id_rating]);
                    yield tyreBrand.$add('reviews', [reviewCreate.id_review]);
                    yield tyreBrand.$add('ratings', [ratingCreate.id_rating]);
                    yield newReview.$set('rating', ratingCreate.id_rating);
                    yield reviewCreate.$add('customer', customer.id_customer);
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
                return new HttpException('Data id: tyres or model or brand not found', HttpStatus.NOT_FOUND);
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewTyresAll = yield this.reviewTyresRepository.findAll({ include: { all: true } });
                return reviewTyresAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    findReviewById(getReviewDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reviewId = yield this.reviewTyresRepository.findByPk(getReviewDto.id_review, { include: { all: true } });
                return reviewId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
    update(id, updateReviewDto) {
        return `This action updates a #${id} review`;
    }
    removeReview(getReviewDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const removeReview = yield this.reviewTyresRepository.destroy({ where: { id_review: getReviewDto.id_review } });
                return removeReview;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
            }
        });
    }
};
ReviewsService = __decorate([
    Injectable(),
    __param(0, InjectModel(ReviewTyres)),
    __metadata("design:paramtypes", [Object, RatingsService,
        TyresService,
        PropsBrandService,
        PropsModelService,
        CustomersService])
], ReviewsService);
export { ReviewsService };
