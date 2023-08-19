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
import { RatingsService } from './ratings.service';
import { GetRatingDto } from './dto/get-rating.dto';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.createRating(createRatingDto);
  }

  @Get('/tyres')
  findAll() {
    return this.ratingsService.findAllRating();
  }

  @Get('/wheels')
  findAllWheels() {
    return this.ratingsService.findAllRatingWheel();
  }

  @Get('/tyres/bybrand/:id_brand')
  findAllRatingByBrand(@Param('id_brand') id_brand: number) {
    return this.ratingsService.findCountRatingByIdBrand(id_brand);
  }

  @Get('/wheels/bybrand/:id_brand')
  findAllRatingWheelByBrand(@Param('id_brand') id_brand: number) {
    return this.ratingsService.findCountRatingWheelByIdBrand(id_brand);
  }

  @Get('/tyres/bybrand-season/')
  findAllRatingByBrandAllSeason(
    @Query('id_brand') id_brand: number,
    @Query('id_season') id_season: number,
  ) {
    return this.ratingsService.findCountRatingAvgByIdBrandSeason(
      id_brand,
      id_season
    );
  }
  
  @Get('/tyres/bymodel/:id_model')
  findAllRatingByModel(@Param('id_model') id_model: number) {
    return this.ratingsService.findCountRatingByIdModel(id_model);
  }

  @Get('/wheels/bymodel/:id_model')
  findAllRatingWheelByModel(@Param('id_model') id_model: number) {
    return this.ratingsService.findCountRatingWheelByIdModel(id_model);
  }

  @Get('/id')
  findOne(@Body() getRatingDto: GetRatingDto) {
    return this.ratingsService.findRatingById(getRatingDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(+id, updateRatingDto);
  }

  @Delete('/remove')
  remove(@Param() @Body() getRatingDto: GetRatingDto) {
    return this.ratingsService.removeRating(getRatingDto);
  }
}
