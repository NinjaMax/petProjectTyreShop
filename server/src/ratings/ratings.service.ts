import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRatingDto } from './dto/create-rating.dto';
import { GetRatingDto } from './dto/get-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingTyres } from './entities/rating-tyres.model';

@Injectable()
export class RatingsService {

  constructor(@InjectModel(RatingTyres) private ratingTyresRepository: typeof RatingTyres,
  ) {}

  async createRating(createRatingDto: CreateRatingDto) {

    try {
      
      const rating = await this.ratingTyresRepository.create(createRatingDto);

      return rating;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
    
  }

  async findAllRating() {

    try {

      const ratingsAll = await this.ratingTyresRepository.findAll({include: {all: true}});

      return ratingsAll;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async findRatingById(getRatingDto: GetRatingDto) {

    try {

      const ratingId = await this.ratingTyresRepository.findByPk(getRatingDto.id_rating, {include: {all: true}});

      return ratingId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  async removeRating(getRatingDto: GetRatingDto) {

    try {

      const removeRating = await this.ratingTyresRepository.destroy({where: {id_rating : getRatingDto.id_rating}});
      
      return removeRating;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }
}
