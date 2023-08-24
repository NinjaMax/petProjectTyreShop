import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRatingDto } from './dto/create-rating.dto';
import { GetRatingDto } from './dto/get-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { RatingTyres } from './entities/rating-tyres.model';
import sequelize from 'sequelize';
import { RatingWheels } from './entities/rating-wheels.model';

@Injectable()
export class RatingsService {
  constructor(
    @InjectModel(RatingTyres) private ratingTyresRepository: typeof RatingTyres,
    @InjectModel(RatingWheels)
    private ratingWheelsRepository: typeof RatingWheels,
  ) {}

  async createRating(createRatingDto: CreateRatingDto) {
    try {
      const rating = await this.ratingTyresRepository.create(createRatingDto);

      return rating;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createRatingWheel(createRatingDto: CreateRatingDto) {
    try {
      const ratingWheel = await this.ratingWheelsRepository.create(
        createRatingDto,
      );

      return ratingWheel;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllRating() {
    try {
      const ratingsAll = await this.ratingTyresRepository.findAll({
        include: { all: true },
      });

      return ratingsAll;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllRatingWheel() {
    try {
      const ratingsAllWheels = await this.ratingWheelsRepository.findAll({
        include: { all: true },
      });

      return ratingsAllWheels;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findRatingById(getRatingDto: GetRatingDto) {
    try {
      const ratingId = await this.ratingTyresRepository.findByPk(
        getRatingDto.id_rating,
        { include: { all: true } },
      );

      return ratingId;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findRatingByIdWheel(getRatingDto: GetRatingDto) {
    try {
      const ratingIdWheel = await this.ratingWheelsRepository.findByPk(
        getRatingDto.id_rating,
        { include: { all: true } },
      );

      return ratingIdWheel;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllRatingByIdModel(getRatingDto: GetRatingDto) {
    try {
      const ratingIdModel = await this.ratingTyresRepository.findAll({
        where: { id_model: getRatingDto.id_model },
      });

      return ratingIdModel;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllRatingWheelByIdModel(getRatingDto: GetRatingDto) {
    try {
      const ratingWheelIdModel = await this.ratingWheelsRepository.findAll({
        where: { id_model: getRatingDto.id_model },
      });

      return ratingWheelIdModel;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllRatingByIdBrand(getRatingDto: GetRatingDto) {
    try {
      const ratingIdBrand = await this.ratingTyresRepository.findAll({
        where: { id_brand: getRatingDto.id_brand },
      });

      return ratingIdBrand;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllWheelRatingByIdBrand(getRatingDto: GetRatingDto) {
    try {
      const ratingWheelIdBrand = await this.ratingWheelsRepository.findAll({
        where: { id_brand: getRatingDto.id_brand },
      });

      return ratingWheelIdBrand;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCountRatingByIdBrand(id_brand: number) {
    try {
      const ratingAvgIdBrand = await this.ratingTyresRepository.findAll({
        where: { id_brand: id_brand },
        attributes: [
          [
            sequelize.fn('avg', sequelize.col('rating_overall')),
            'avgRatingBrand',
          ],
        ],
      });
      return ratingAvgIdBrand;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCountRatingWheelByIdBrand(id_brand: number) {
    try {
      const ratingWheelAvgIdBrand = await this.ratingWheelsRepository.findAll({
        where: { id_brand: id_brand },
        attributes: [
          [
            sequelize.fn('avg', sequelize.col('rating_overall')),
            'avgRatingBrand',
          ],
        ],
      });
      return ratingWheelAvgIdBrand;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCountRatingAvgByIdBrandSeason(id_brand: number, id_season: number) {
    try {
      const ratingAvgIdBrandAllSeason =
        await this.ratingTyresRepository.findAll({
          where: { id_brand: id_brand, id_season: id_season },
          attributes: [
            [
              sequelize.fn('avg', sequelize.col('rating_overall')),
              'avgRatingBrandBySeason',
            ],
          ],
        });

      return ratingAvgIdBrandAllSeason;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCountRatingByIdModel(id_model: number) {
    try {
      const ratingAvgIdModel = await this.ratingTyresRepository.findAll({
        where: { id_model: id_model },
        attributes: [
          [
            sequelize.fn('avg', sequelize.col('rating_overall')),
            'avgRatingModel',
          ],
          [
            sequelize.fn('avg', sequelize.col('rating_dry_road')),
            'avgRatingDryRoad',
          ],
          [
            sequelize.fn('avg', sequelize.col('rating_wet_road')),
            'avgRatingWetRoad',
          ],
          [
            sequelize.fn('avg', sequelize.col('rating_snow_road')),
            'avgRatingSnowRoad',
          ],
          [
            sequelize.fn('avg', sequelize.col('rating_ice_road')),
            'avgRatingIceRoad',
          ],
          [
            sequelize.fn('avg', sequelize.col('rating_cross_country')),
            'avgRatingCrossCountry',
          ],
          [
            sequelize.fn('avg', sequelize.col('rating_treadwear')),
            'avgRatingTreadwear',
          ],
          [
            sequelize.fn('avg', sequelize.col('rating_price_quality')),
            'avgRatingPriceQuality',
          ],
        ],
      });

      return ratingAvgIdModel;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCountTyreRatingByIdAndIdModel(id: number, id_model: number) {
    try {
      const ratingTyreAvgIdAndIdModel =
        await this.ratingTyresRepository.findAll({
          where: { id: id, id_model: id_model },
          attributes: [
            [
              sequelize.fn('avg', sequelize.col('rating_overall')),
              'avgRatingModel',
            ],
            [
              sequelize.fn('avg', sequelize.col('rating_dry_road')),
              'avgRatingDryRoad',
            ],
            [
              sequelize.fn('avg', sequelize.col('rating_wet_road')),
              'avgRatingWetRoad',
            ],
            [
              sequelize.fn('avg', sequelize.col('rating_snow_road')),
              'avgRatingSnowRoad',
            ],
            [
              sequelize.fn('avg', sequelize.col('rating_ice_road')),
              'avgRatingIceRoad',
            ],
            [
              sequelize.fn('avg', sequelize.col('rating_cross_country')),
              'avgRatingCrossCountry',
            ],
            [
              sequelize.fn('avg', sequelize.col('rating_treadwear')),
              'avgRatingTreadwear',
            ],
            [
              sequelize.fn('avg', sequelize.col('rating_price_quality')),
              'avgRatingPriceQuality',
            ],
          ],
        });

      return ratingTyreAvgIdAndIdModel;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCountRatingWheelByIdModel(id_model: number) {
    try {
      const ratingAvgIdModel = await this.ratingWheelsRepository.findAll({
        where: { id_model: id_model },
        attributes: [
          [
            sequelize.fn('avg', sequelize.col('rating_overall')),
            'avgRatingModel',
          ],
        ],
      });

      return ratingAvgIdModel;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCountRatingWheelByIdAndIdModel(id: number, id_model: number) {
    try {
      const ratingWheelAvgIdAndIdModel =
        await this.ratingWheelsRepository.findAll({
          where: { id: id, id_model: id_model },
          attributes: [
            [
              sequelize.fn('avg', sequelize.col('rating_overall')),
              'avgRatingModel',
            ],
          ],
        });

      return ratingWheelAvgIdAndIdModel;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  update(id: number, updateRatingDto: UpdateRatingDto) {
    return `This action updates a #${id} rating`;
  }

  async removeRating(getRatingDto: GetRatingDto) {
    try {
      const removeRating = await this.ratingTyresRepository.destroy({
        where: { id_rating: getRatingDto.id_rating },
      });

      return removeRating;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
