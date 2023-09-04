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
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewDto } from './dto/get-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewsStoreService } from './reviews-store.service';

@Controller('reviews-store')
export class ReviewsStoreController {
  constructor(private readonly reviewsStoreService: ReviewsStoreService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsStoreService.createReviewStore(createReviewDto);
  }

  @Get('/allstores')
  findAll() {
    return this.reviewsStoreService.findAllReviewsStore();
  }

  @Get('/allstores-limit/')
  findAllReviewWithLimit(
    @Query('limit') limit: string,
    @Query('offset') offset: string
  ) {
    return this.reviewsStoreService.findAllReviewsStoreLimit(+limit, +offset);
  }

  @Get('/id')
  findOne(@Param() @Body() getReviewDto: GetReviewDto) {
    return this.reviewsStoreService.findReviewStoreById(getReviewDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsStoreService.update(+id, updateReviewDto);
  }

  @Delete('/remove/store')
  remove(@Param() @Body() getReviewDto: GetReviewDto) {
    return this.reviewsStoreService.removeReviewStore(getReviewDto);
  }
}
