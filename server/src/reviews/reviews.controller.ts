import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewDto } from './dto/get-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReview(createReviewDto);
  }

  @Post('/createwheel')
  createWheel(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.createReviewWheel(createReviewDto);
  }

  @Get('/tyres')
  findAll() {
    return this.reviewsService.findAllReviews();
  }

  @Get('/wheels')
  findAllWheel() {
    return this.reviewsService.findAllReviewsWheel();
  }

  @Get('/tyres/limit/')
  findTyresReviewWithLimit(
    @Query('limit') limit: string,
    @Query('offset') offset: string
  ) {
    return this.reviewsService.findReviewsTyresLimit(+limit, +offset);
  }

  @Get('/wheels/limit/')
  findWheelsReviewWithLimit(
    @Query('limit') limit: string,
    @Query('offset') offset: string
  ) {
    return this.reviewsService.findReviewsWheelsLimit(+limit, +offset);
  }

  @Get('count/brand')
  countReviewByBrand(@Query('id_brand') id_brand: number) {
    return this.reviewsService.countReviewByIdBrand(id_brand);
  }

  @Get('count/wheel-brand')
  countReviewWheelByBrand(@Query('id_brand') id_brand: number) {
    return this.reviewsService.countReviewWheelByIdBrand(id_brand);
  }

  @Get('count/model')
  countReviewByModel(@Query('id_model') id_model: number) {
    return this.reviewsService.countReviewByIdModel(id_model);
  }

  @Get('count/wheel-model')
  countReviewWheelByModel(@Query('id_model') id_model: number) {
    return this.reviewsService.countReviewWheelByIdModel(id_model);
  }

  @Get('/id')
  findOne(@Param() @Body() getReviewDto: GetReviewDto) {
    return this.reviewsService.findReviewById(getReviewDto);
  }

  @Get('/id-wheel')
  findOneWheel(@Param() @Body() getReviewDto: GetReviewDto) {
    return this.reviewsService.findReviewWheelById(getReviewDto);
  }

  @Patch('/likes')
  updateLikes(@Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.countLikeByIdReview(updateReviewDto);
  }

  @Patch('/likes/wheel')
  updateWheelLikes(@Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.countLikeByIdReviewWheel(updateReviewDto);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete('/remove')
  remove(@Param() @Body() getReviewDto: GetReviewDto) {
    return this.reviewsService.removeReview(getReviewDto);
  }
}
