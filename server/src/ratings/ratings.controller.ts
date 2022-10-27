import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { GetRatingDto } from './dto/get-rating.dto';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
//import { CreateReviewDto } from 'src/reviews/dto/create-review.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.createRating(createRatingDto);
  }

  @Get()
  findAll() {
    return this.ratingsService.findAllRating();
  }

  @Get('/id')
  findOne(@Body() getRatingDto: GetRatingDto) {
    return this.ratingsService.findRatingById(getRatingDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(+id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') getRatingDto: GetRatingDto) {
    return this.ratingsService.removeRating(getRatingDto);
  }
}
