import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.reviewsService.findAllReviews();
  }

  @Get('/id')
  findOne(@Param() @Body()getReviewDto: GetReviewDto) {
    return this.reviewsService.findReviewById(getReviewDto);
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
