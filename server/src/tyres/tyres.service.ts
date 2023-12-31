import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTyreDto } from './dto/create-tyre.dto';
import { GetTyreDto } from './dto/get-tyre.dto';
import { UpdateTyreDto } from './dto/update-tyre.dto';
import { Tyres } from './entities/tyres.model';
import { TyreSeason } from '../properties/entities/tyres/tyre-season.model';
import { TyreVehicleType } from '../properties/entities/tyres/tyre-vehicleType.model';
import { TyreDiameter } from '../properties/entities/tyres/tyre-diameter.model';
import { TyreParams } from '../properties/entities/tyres/tyre-params.model';
import { Op } from 'sequelize';
import { TyreWidth } from '../properties/entities/tyres/tyre-width.model';
import { TyreHeight } from '../properties/entities/tyres/tyre-height.model';
import { TyreBrand } from '../properties/entities/tyres/tyre-brand.model';
import { PriceTyres } from '../prices/entities/price-tyres.model';
import { TyreSpeedIndex } from '../properties/entities/tyres/tyre-speedIndex.model';
import { TyreLoadIndex } from '../properties/entities/tyres/tyre-loadIndex.model';
import { TyreStudded } from '../properties/entities/tyres/tyre-studded.model';
import { TyreRunFlat } from '../properties/entities/tyres/tyre-runFlat.model';
import { TyreHomologation } from '../properties/entities/tyres/tyre-homologation.model';
import { StockTyres } from '../stock/entities/stock-tyres.model';
import { TyreReinforce } from '../properties/entities/tyres/tyre-reinforce.model';
import sequelize, { Sequelize } from 'sequelize';
//import { transaction } from 'sequelize-typescript';
import { TyreModel } from '../properties/entities/tyres/tyre-model.model';
import { RatingTyres } from '../ratings/entities/rating-tyres.model';
import { ReviewTyres } from '../reviews/entities/review-tyres.model';
import { TyreCountry } from '../properties/entities/tyres/tyre-country.model';
import { TyreYear } from '../properties/entities/tyres/tyre-year.model';
import { TyreSizeDigits } from '../properties/entities/tyres/tyre-sizeDigits.model';
import { RedisService } from '../redis/redis.service';
import { Category } from '../categorys/entities/category.model';

@Injectable()
export class TyresService {
  constructor(
    @InjectModel(Tyres) private tyresRepository: typeof Tyres,
    private readonly redisService: RedisService,
  ) {}

  async createTyres(createTyreDto: CreateTyreDto) {
    try {
      const tyres = await this.tyresRepository.create(createTyreDto);
      return tyres;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createTyresFromPrice(
    id: number,
    id_sup: string,
    full_name: string,
    photo_url: string,
    update_date: Date,
  ) {
    try {
      const [tyresIdFromPrice, created] =
        await this.tyresRepository.findOrCreate({
          where: { id: +id },
          defaults: {
            id: id,
            id_goods_sup: id_sup,
            full_name: full_name,
            //photo_url: photo_url,
            update_date: update_date,
          },
        });

      if (!created) {
        const updateTyres = await tyresIdFromPrice.update(
          {
            //full_name: full_name,
            //photo_url: photo_url,
            id_goods_sup: id_sup,
            update_date: update_date,
          },
          { where: { id: tyresIdFromPrice.id } },
        );
        return updateTyres;
      }
    } catch (error) {
      console.log('ERROR_DETAIL: ', error, id);
      throw new HttpException(
        //'Data is incorrect and must be uniq',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyres() {
    try {
      const tyresAll = await this.tyresRepository.findAll({
        include: [
          { model: ReviewTyres },
          { model: RatingTyres },
          { model: PriceTyres },
          { model: StockTyres },
          { model: TyreYear },
          { model: TyreCountry },
          { model: TyreVehicleType },
          { model: TyreSeason },
          { model: TyreSizeDigits },
          { model: TyreBrand },
          { model: Category},
          { model: TyreDiameter },
          //{ all: true },
        ],
      });
      return tyresAll;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresAdmin() {
    try {
      const tyresAllAdmin = await this.tyresRepository.findAll({
        include: [
          { model: TyreYear },
          { model: TyreCountry },
          { model: TyreVehicleType },
          { model: TyreSeason },
          { model: PriceTyres},
          { model: StockTyres },
          { model: TyreBrand },
          { model: Category},
          //{ all: true },
        ],
      });
      return tyresAllAdmin;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithOffsetMain(
    width: string,
    height: string,
    diameter: string,
    season: string,
    brand: string,
    //price: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresMain = await this.redisService.get(
        'tyrefilter' +
          width +
          height +
          diameter +
          season +
          brand +
          sort +
          'main',
      );
      if (cachedTyresMain) {
        return cachedTyresMain;
      }
      if (sort === 'ASC') {
        const tyresAllWithoutLimitMain =
          await this.tyresRepository.findAndCountAll({
            include: [
              { model: Category},
              width 
                ? {
                    model: TyreWidth,
                    where: {
                      width: {
                        [Op.in]: width.split(','),
                      },
                    },
                  }
                : { model: TyreWidth },
              height
                ? {
                    model: TyreHeight,
                    where: {
                      height: {
                        [Op.in]: height.split(','),
                      },
                    },
                  }
                : { model: TyreHeight },
              diameter
                ? {
                    model: TyreDiameter,
                    where: {
                      diameter: {
                        [Op.in]: diameter.split(','),
                      },
                    },
                  }
                : { model: TyreDiameter },
              season
                ? {
                    model: TyreSeason,
                    where: {
                      season_ua: {
                        [Op.in]: season.split(','),
                      },
                    },
                  }
                : { model: TyreSeason },
              brand
                ? {
                    model: TyreBrand,
                    where: {
                      brand: {
                        [Op.in]: brand.split(','),
                      },
                    },
                  }
                : { model: TyreBrand },
              // price
              //   ? {
              //       model: PriceTyres,
              //       where: {
              //         price: { [Op.between]: price.split(',') },
              //       },
              //     }
              //   : { model: PriceTyres },
            ],
          });
        await this.redisService.set(
          'tyrefilter' +
            width +
            height +
            diameter +
            season +
            brand +
            sort +
            'main',
          3600,
          JSON.stringify(tyresAllWithoutLimitMain),
        );
        return tyresAllWithoutLimitMain;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE: ', error);
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithoutOffset(
    //width: string,
    // height: string,
    // diameter: string,
    // season: string,
    // brand: string,
    price: string,
    type: string,
    speed_index: string,
    load_index: string,
    // studded: string,
    // run_flat: string,
    // homologation: string,
    // reinforce: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresAll = await this.redisService.get(
        'tyrefilter' +
        //width +
        // height +
        // diameter +
        // season +
        // brand +
        price +
        type +
        speed_index +
        load_index +
        // studded +
        // run_flat +
        // homologation +
        // reinforce +
        sort +
        'middle',
      );
      if (cachedTyresAll) {
        return cachedTyresAll;
      }
      if (sort === 'ASC') {
        const tyresAllWithoutLimitTyreProps =
          await this.tyresRepository.findAndCountAll({
            include: [
              // width 
              //   ? {
              //       model: TyreWidth,
              //       where: {
              //         width: {
              //           [Op.in]: width.split(','),
              //         },
              //       },
              //     }
              //   : { model: TyreWidth },
              // height
              //   ? {
              //       model: TyreHeight,
              //       where: {
              //         height: {
              //           [Op.in]: height.split(','),
              //         },
              //       },
              //     }
              //   : { model: TyreHeight },
              // diameter
              //   ? {
              //       model: TyreDiameter,
              //       where: {
              //         diameter: {
              //           [Op.in]: diameter.split(','),
              //         },
              //       },
              //     }
              //   : { model: TyreDiameter },
              // season
              //   ? {
              //       model: TyreSeason,
              //       where: {
              //         season_ua: {
              //           [Op.in]: season.split(','),
              //         },
              //       },
              //     }
              //   : { model: TyreSeason },
              // brand
              //   ? {
              //       model: TyreBrand,
              //       where: {
              //         brand: {
              //           [Op.in]: brand.split(','),
              //         },
              //       },
              //     }
              //   : { model: TyreBrand },
              price
                ? {
                    model: PriceTyres,
                    where: {
                      price: { [Op.between]: price.split(',') },
                    },
                  }
                : { model: PriceTyres },
              type
                ? {
                    model: TyreVehicleType,
                    where: {
                      vehicle_type_ua: {
                        [Op.in]: type.split(','),
                      },
                    },
                  }
                : { model: TyreVehicleType },
              speed_index
                ? {
                    model: TyreSpeedIndex,
                    where: {
                      speed_index_with_desc: {
                        [Op.in]: speed_index.split(','),
                      },
                    },
                  }
                : { model: TyreSpeedIndex },
              load_index
                ? {
                    model: TyreLoadIndex,
                    where: {
                      load_index_with_desc: {
                        [Op.in]: load_index.split(','),
                      },
                    },
                  }
                : { model: TyreLoadIndex },
              // studded
              //   ? {
              //       model: TyreStudded,
              //       where: {
              //         studded: {
              //           [Op.in]: studded.split(','),
              //         },
              //       },
              //     }
              //   : { model: TyreStudded },
              // run_flat
              //   ? {
              //       model: TyreRunFlat,
              //       where: {
              //         run_flat: {
              //           [Op.in]: run_flat.split(','),
              //         },
              //       },
              //     }
              //   : { model: TyreRunFlat },
              // homologation
              //   ? {
              //       model: TyreHomologation,
              //       where: {
              //         homologation: {
              //           [Op.in]: homologation.split(','),
              //         },
              //       },
              //     }
              //   : { model: TyreHomologation },
              // reinforce
              //   ? {
              //       model: TyreReinforce,
              //       where: {
              //         reinforce: {
              //           [Op.in]: reinforce.split(','),
              //         },
              //       },
              //     }
              //   : { model: TyreReinforce },
            ],
          });
        await this.redisService.set(
          'tyrefilter' +
          //width +
          // height +
          // diameter +
          // season +
          // brand +
          price +
          type +
          speed_index +
          load_index +
          // studded +
          // run_flat +
          // homologation +
          // reinforce +
          sort + 
          'middle',
          3600,
          JSON.stringify(tyresAllWithoutLimitTyreProps),
        );
        return tyresAllWithoutLimitTyreProps;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE: ', error);
      //await t.rollback();
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithoutOffsetProps(
    studded: string,
    run_flat: string,
    homologation: string,
    reinforce: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresAllProps = await this.redisService.get(
        'tyrefilter' +
          studded +
          run_flat +
          homologation +
          reinforce +
          sort +
          'bottom',
      );
      if (cachedTyresAllProps) {
        return cachedTyresAllProps;
      }
      if (sort === 'ASC') {
        const tyresAllWithoutLimitTyreProps =
          await this.tyresRepository.findAndCountAll({
            include: [
              studded
                ? {
                    model: TyreStudded,
                    where: {
                      studded: {
                        [Op.in]: studded.split(','),
                      },
                    },
                  }
                : { model: TyreStudded },
              run_flat
                ? {
                    model: TyreRunFlat,
                    where: {
                      run_flat: {
                        [Op.in]: run_flat.split(','),
                      },
                    },
                  }
                : { model: TyreRunFlat },
              homologation
                ? {
                    model: TyreHomologation,
                    where: {
                      homologation: {
                        [Op.in]: homologation.split(','),
                      },
                    },
                  }
                : { model: TyreHomologation },
              reinforce
                ? {
                    model: TyreReinforce,
                    where: {
                      reinforce: {
                        [Op.in]: reinforce.split(','),
                      },
                    },
                  }
                : { model: TyreReinforce },
            ],
          });
        await this.redisService.set(
          'tyrefilter' + 
            studded +
            run_flat +
            homologation +
            reinforce +
            sort + 
            'bottom',
          3600,
          JSON.stringify(tyresAllWithoutLimitTyreProps),
        );
        return tyresAllWithoutLimitTyreProps;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE: ', error);
      //await t.rollback();
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithoutOffsetDiameter(
    diameter: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresAllDiameter = await this.redisService.get(
        'diameter' + diameter + sort + 'tyre_props',
      );
      if (cachedTyresAllDiameter) {
        return cachedTyresAllDiameter;
      }
      if (sort === 'ASC') {
        const tyresAllWithoutLimitTyreProps =
          await this.tyresRepository.findAndCountAll({
            include: [
              diameter
                ? {
                    model: TyreDiameter,
                    where: {
                      diameter: {
                        [Op.in]: diameter.split(','),
                      },
                    },
                  }
                : { model: TyreDiameter },
            ],
          });
        await this.redisService.set(
          'diameter' +
          diameter +
          sort + 
          'tyre_props',
          1200,
          JSON.stringify(tyresAllWithoutLimitTyreProps),
        );
        return tyresAllWithoutLimitTyreProps;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE: ', error);
      //await t.rollback();
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithoutOffsetSeason(
    season: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresAllSeason = await this.redisService.get(
        'season' +
        season +
        sort +
        'tyre_props',
      );
      if (cachedTyresAllSeason) {
        return cachedTyresAllSeason;
      }
      if (sort === 'ASC') {
        const tyresAllWithoutLimitTyreProps =
          await this.tyresRepository.findAndCountAll({
            include: [
              season
                ? {
                    model: TyreSeason,
                    where: {
                      season_ua: {
                        [Op.in]: season.split(','),
                      },
                    },
                  }
                : { model: TyreSeason },
            ],
          });
        await this.redisService.set(
          'season' +
          season +
          sort + 
          'tyre_props',
          1200,
          JSON.stringify(tyresAllWithoutLimitTyreProps),
        );
        return tyresAllWithoutLimitTyreProps;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE: ', error);
      //await t.rollback();
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithoutOffsetBrand(
    brand: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresAllBrand = await this.redisService.get(
        'brand' +
        brand +
        sort +
        'tyre_props',
      );
      if (cachedTyresAllBrand) {
        return cachedTyresAllBrand;
      }
      if (sort === 'ASC') {
        const tyresAllWithoutLimitTyreProps =
          await this.tyresRepository.findAndCountAll({
            include: [
              brand
                ? {
                    model: TyreBrand,
                    where: {
                      brand: {
                        [Op.in]: brand.split(','),
                      },
                    },
                  }
                : { model: TyreBrand },
            ],
          });
        await this.redisService.set(
          'brand' +
          brand +
          sort + 
          'tyre_props',
          1200,
          JSON.stringify(tyresAllWithoutLimitTyreProps),
        );
        return tyresAllWithoutLimitTyreProps;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE: ', error);
      //await t.rollback();
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithoutOffsetType(
    type: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresAllType = await this.redisService.get(
        'type' +
        type +
        sort +
        'tyre_props',
      );
      if (cachedTyresAllType) {
        return cachedTyresAllType;
      }
      if (sort === 'ASC') {
        const tyresAllTypeTyreProps =
          await this.tyresRepository.findAndCountAll({
            include: [
              type
                ? {
                    model: TyreVehicleType,
                    where: {
                      vehicle_type_ua: {
                        [Op.in]: type.split(','),
                      },
                    },
                  }
                : { model: TyreVehicleType },
            ],
          });
        await this.redisService.set(
          'type' +
          type +
          sort + 
          'tyre_props',
          3600,
          JSON.stringify(tyresAllTypeTyreProps),
        );
        return tyresAllTypeTyreProps;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE: ', error);
      //await t.rollback();
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithoutOffsetSpeedI(
    speed_index: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresAllSpeed = await this.redisService.get(
        'speed_index' +
        speed_index +
        sort +
        'tyre_props',
      );
      if (cachedTyresAllSpeed) {
        return cachedTyresAllSpeed;
      }
      if (sort === 'ASC') {
        const tyresAllSpeedITyreProps =
          await this.tyresRepository.findAndCountAll({
            include: [
              speed_index
                ? {
                    model: TyreSpeedIndex,
                    where: {
                      speed_index_with_desc: {
                        [Op.in]: speed_index.split(','),
                      },
                    },
                  }
                : { model: TyreSpeedIndex },
            ],
          });
        await this.redisService.set(
          'speed_index' +
          speed_index +
          sort + 
          'tyre_props',
          3600,
          JSON.stringify(tyresAllSpeedITyreProps),
        );
        return tyresAllSpeedITyreProps;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE: ', error);
      //await t.rollback();
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithoutOffsetLoadI(
    load_index: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresAllLoadI = await this.redisService.get(
        'load_index' +
        load_index +
        sort +
        'tyre_props',
      );
      if (cachedTyresAllLoadI) {
        return cachedTyresAllLoadI;
      }
      if (sort === 'ASC') {
        const tyresAllLoadITyreProps =
          await this.tyresRepository.findAndCountAll({
            include: [
              load_index
                ? {
                    model: TyreLoadIndex,
                    where: {
                      load_index_with_desc: {
                        [Op.in]: load_index.split(','),
                      },
                    },
                  }
                : { model: TyreLoadIndex },
            ],
          });
        await this.redisService.set(
          'load_index' +
          load_index +
          sort + 
          'tyre_props',
          3600,
          JSON.stringify(tyresAllLoadITyreProps),
        );
        return tyresAllLoadITyreProps;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE: ', error);
      //await t.rollback();
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithoutOffsetStudded(
    studded: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresAllStudded = await this.redisService.get(
        'studded' +
        studded +
        sort +
        'tyre_props',
      );
      if (cachedTyresAllStudded) {
        return cachedTyresAllStudded;
      }
      if (sort === 'ASC') {
        const tyresAllStuddedTyreProps =
          await this.tyresRepository.findAndCountAll({
            include: [
              studded
                ? {
                    model: TyreStudded,
                    where: {
                      studded: {
                        [Op.in]: studded.split(','),
                      },
                    },
                  }
                : { model: TyreStudded },
            ],
          });
        await this.redisService.set(
          'studded' +
          studded +
          sort + 
          'tyre_props',
          3600,
          JSON.stringify(tyresAllStuddedTyreProps),
        );
        return tyresAllStuddedTyreProps;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE: ', error);
      //await t.rollback();
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithoutOffsetRunFlat(
    run_flat: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresAllRunFlat = await this.redisService.get(
        'run_flat' +
        run_flat +
        sort +
        'tyre_props',
      );
      if (cachedTyresAllRunFlat) {
        return cachedTyresAllRunFlat;
      }
      if (sort === 'ASC') {
        const tyresAllRunFlatTyreProps =
          await this.tyresRepository.findAndCountAll({
            include: [
              run_flat
                ? {
                    model: TyreRunFlat,
                    where: {
                      run_flat: {
                        [Op.in]: run_flat.split(','),
                      },
                    },
                  }
                : { model: TyreRunFlat },
            ],
          });
        await this.redisService.set(
          'run_flat' +
          run_flat +
          sort + 
          'tyre_props',
          3600,
          JSON.stringify(tyresAllRunFlatTyreProps),
        );
        return tyresAllRunFlatTyreProps;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE: ', error);
      //await t.rollback();
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithoutOffsetHomologation(
    homologation: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresAllRunHomologation = await this.redisService.get(
        'homologation' +
        homologation +
        sort +
        'tyre_props',
      );
      if (cachedTyresAllRunHomologation) {
        return cachedTyresAllRunHomologation;
      }
      if (sort === 'ASC') {
        const tyresAllHomologationTyreProps =
          await this.tyresRepository.findAndCountAll({
            include: [
              homologation
                ? {
                    model: TyreHomologation,
                    where: {
                      homologation: {
                        [Op.in]: homologation.split(','),
                      },
                    },
                  }
                : { model: TyreHomologation },
            ],
          });
        await this.redisService.set(
          'homologation' +
          homologation +
          sort + 
          'tyre_props',
          3600,
          JSON.stringify(tyresAllHomologationTyreProps),
        );
        return tyresAllHomologationTyreProps;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE: ', error);
      //await t.rollback();
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithoutOffsetReinforce(
    reinforce: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresAllReinforce = await this.redisService.get(
        'reinforce' +
        reinforce +
        sort +
        'tyre_props',
      );
      if (cachedTyresAllReinforce) {
        return cachedTyresAllReinforce;
      }
      if (sort === 'ASC') {
        const tyresAllReinforceTyreProps =
          await this.tyresRepository.findAndCountAll({
            include: [
              reinforce
                ? {
                    model: TyreReinforce,
                    where: {
                      reinforce: {
                        [Op.in]: reinforce.split(','),
                      },
                    },
                  }
                : { model: TyreReinforce },
            ],
          });
        await this.redisService.set(
          'reinforce' +
          reinforce +
          sort + 
          'tyre_props',
          3600,
          JSON.stringify(tyresAllReinforceTyreProps),
        );
        return tyresAllReinforceTyreProps;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE: ', error);
      //await t.rollback();
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithCatOffset(
    limit: number,
    offset: number,
    width: string,
    height: string,
    diameter: string,
    season: string,
    brand: string,
    price: string,
    type: string,
    speed_index: string,
    load_index: string,
    studded: string,
    run_flat: string,
    homologation: string,
    reinforce: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresCatalog = await this.redisService.get(
        'tyres' +
        limit +
        offset +
        width +
        height +
        diameter +
        season +
        brand +
        price +
        type +
        speed_index +
        load_index +
        studded +
        run_flat +
        homologation +
        reinforce +
        sort +
        'catalog',
      );
      if (cachedTyresCatalog) {
        return cachedTyresCatalog;
      }
      if (sort === 'ASC') {
        const tyresAllWithIdForCatalog =
          await this.tyresRepository.findAndCountAll({
            include: [
              { model: RatingTyres },
              { model: ReviewTyres },
              //{ model: StockTyres },
              { model: TyreCountry },
              { model: TyreYear },
              { model: Category},
              width 
                ? {
                    model: TyreWidth,
                    where: {
                      width: {
                        [Op.in]: width.split(','),
                      },
                    },
                  }
                : { model: TyreWidth },
              height
                ? {
                    model: TyreHeight,
                    where: {
                      height: {
                        [Op.in]: height.split(','),
                      },
                    },
                  }
                : { model: TyreHeight },
              diameter
                ? {
                    model: TyreDiameter,
                    where: {
                      diameter: {
                        [Op.in]: diameter.split(','),
                      },
                    },
                  }
                : { model: TyreDiameter },
              season
                ? {
                    model: TyreSeason,
                    where: {
                      season_ua: {
                        [Op.in]: season.split(','),
                      },
                    },
                  }
                : { model: TyreSeason },
              brand
                ? {
                    model: TyreBrand,
                    where: {
                      id_brand: {
                        [Op.in]: brand.split(','),
                      },
                    },
                  }
                : { model: TyreBrand },
              price
                ? {
                    model: PriceTyres,
                    where: {
                      price: { [Op.between]: price.split(',') },
                    },
                  }
                : { model: PriceTyres },
              type
                ? {
                    model: TyreVehicleType,
                    where: {
                      vehicle_type_ua: {
                        [Op.in]: type.split(','),
                      },
                    },
                  }
                : { model: TyreVehicleType },
              speed_index
                ? {
                    model: TyreSpeedIndex,
                    where: {
                      speed_index_with_desc: {
                        [Op.in]: speed_index.split(','),
                      },
                    },
                  }
                : { model: TyreSpeedIndex },
              load_index
                ? {
                    model: TyreLoadIndex,
                    where: {
                      load_index_with_desc: {
                        [Op.in]: load_index.split(','),
                      },
                    },
                  }
                : { model: TyreLoadIndex },
              studded
                ? {
                    model: TyreStudded,
                    where: {
                      studded: {
                        [Op.in]: studded.split(','),
                      },
                    },
                  }
                : { model: TyreStudded },
              run_flat
                ? {
                    model: TyreRunFlat,
                    where: {
                      run_flat: {
                        [Op.in]: run_flat.split(','),
                      },
                    },
                  }
                : { model: TyreRunFlat },
              homologation
                ? {
                    model: TyreHomologation,
                    where: {
                      homologation: {
                        [Op.in]: homologation.split(','),
                      },
                    },
                  }
                : { model: TyreHomologation },
              reinforce
                ? {
                    model: TyreReinforce,
                    where: {
                      reinforce: {
                        [Op.in]: reinforce.split(','),
                      },
                    },
                  }
                : { model: TyreReinforce },
            ],
            order: [
              [
                sequelize.literal(
                  `CASE WHEN price.price = null OR price.price = 0 THEN NULL ELSE 0 END`,
                ),
                'ASC',
              ],
              ['price', 'price', 'ASC NULLS LAST'],
            ],
          });
        const lengthTyresAll = tyresAllWithIdForCatalog.rows.length;
        const tyresAllCatCashAsc = tyresAllWithIdForCatalog.rows.splice(offset, limit);
        await this.redisService.set(
          'tyres' +
          limit +
          offset +
          width +
          height +
          diameter +
          season +
          brand +
          price +
          type +
          speed_index +
          load_index +
          studded +
          run_flat +
          homologation +
          reinforce +
          sort +
          'catalog',
          3600,
          JSON.stringify({ rows: tyresAllCatCashAsc, count: lengthTyresAll}),
        );
        return  { rows: tyresAllCatCashAsc, count: lengthTyresAll};
      }
      if (sort === 'DESC') {
        const tyresAllWithCatLimitDesc =
          await this.tyresRepository.findAndCountAll({
            include: [
              { model: RatingTyres },
              { model: ReviewTyres },
              //{ model: StockTyres },
              { model: TyreCountry },
              { model: TyreYear },
              { model: Category},
              width
                ? {
                    model: TyreWidth,
                    where: {
                      width: {
                        [Op.in]: width.split(','),
                      },
                    },
                  }
                : { model: TyreWidth },
              height
                ? {
                    model: TyreHeight,
                    where: {
                      height: {
                        [Op.in]: height.split(','),
                      },
                    },
                  }
                : { model: TyreHeight },
              diameter
                ? {
                    model: TyreDiameter,
                    where: {
                      diameter: {
                        [Op.in]: diameter.split(','),
                      },
                    },
                  }
                : { model: TyreDiameter },
              season
                ? {
                    model: TyreSeason,
                    where: {
                      season_ua: {
                        [Op.in]: season.split(','),
                      },
                    },
                  }
                : { model: TyreSeason },
              brand
                ? {
                    model: TyreBrand,
                    where: {
                      brand: {
                        [Op.in]: brand.split(','),
                      },
                    },
                  }
                : { model: TyreBrand },
              price
                ? {
                    model: PriceTyres,
                    where: {
                      price: { [Op.between]: price.split(',') },
                    },
                  }
                : { model: PriceTyres },
              type
                ? {
                    model: TyreVehicleType,
                    where: {
                      vehicle_type_ua: {
                        [Op.in]: type.split(','),
                      },
                    },
                  }
                : { model: TyreVehicleType },
              speed_index
                ? {
                    model: TyreSpeedIndex,
                    where: {
                      speed_index_with_desc: {
                        [Op.in]: speed_index.split(','),
                      },
                    },
                  }
                : { model: TyreSpeedIndex },
              load_index
                ? {
                    model: TyreLoadIndex,
                    where: {
                      load_index_with_desc: {
                        [Op.in]: load_index.split(','),
                      },
                    },
                  }
                : { model: TyreLoadIndex },
              studded
                ? {
                    model: TyreStudded,
                    where: {
                      studded: {
                        [Op.in]: studded.split(','),
                      },
                    },
                  }
                : { model: TyreStudded },
              run_flat
                ? {
                    model: TyreRunFlat,
                    where: {
                      run_flat: {
                        [Op.in]: run_flat.split(','),
                      },
                    },
                  }
                : { model: TyreRunFlat },
              homologation
                ? {
                    model: TyreHomologation,
                    where: {
                      homologation: {
                        [Op.in]: homologation.split(','),
                      },
                    },
                  }
                : { model: TyreHomologation },
              reinforce
                ? {
                    model: TyreReinforce,
                    where: {
                      reinforce: {
                        [Op.in]: reinforce.split(','),
                      },
                    },
                  }
                : { model: TyreReinforce },
            ],
            order: [
              [
                sequelize.literal(
                  `CASE WHEN price.price = null OR price.price = 0 THEN NULL ELSE 0 END`,
                ),
                'ASC',
              ],
              ['price', 'price', 'DESC'],
            ],
          });
        const tyresAllCatCashDesc = tyresAllWithCatLimitDesc.rows.splice(offset, limit);
        await this.redisService.set(
          'tyres' +
          limit +
          offset +
          width +
          height +
          diameter +
          season +
          brand +
          price +
          type +
          speed_index +
          load_index +
          studded +
          run_flat +
          homologation +
          reinforce +
          sort +
          'catalog',
          1200,
          JSON.stringify(tyresAllCatCashDesc),
        );
        return tyresAllCatCashDesc;
      }
      if (sort === 'oldPrice') {
        const tyresAllWithCatLimitOld =
          await this.tyresRepository.findAndCountAll({
            include: [
              { model: RatingTyres },
              { model: ReviewTyres },
              //{ model: StockTyres },
              { model: TyreCountry },
              { model: TyreYear },
              { model: Category},
              width
                ? {
                    model: TyreWidth,
                    where: {
                      width: {
                        [Op.in]: width.split(','),
                      },
                    },
                  }
                : { model: TyreWidth },
              height
                ? {
                    model: TyreHeight,
                    where: {
                      height: {
                        [Op.in]: height.split(','),
                      },
                    },
                  }
                : { model: TyreHeight },
              diameter
                ? {
                    model: TyreDiameter,
                    where: {
                      diameter: {
                        [Op.in]: diameter.split(','),
                      },
                    },
                  }
                : { model: TyreDiameter },
              season
                ? {
                    model: TyreSeason,
                    where: {
                      season_ua: {
                        [Op.in]: season.split(','),
                      },
                    },
                  }
                : { model: TyreSeason },
              brand
                ? {
                    model: TyreBrand,
                    where: {
                      brand: {
                        [Op.in]: brand.split(','),
                      },
                    },
                  }
                : { model: TyreBrand },
              price
                ? {
                    model: PriceTyres,
                    where: {
                      price: { [Op.between]: price.split(',') },
                    },
                  }
                : { model: PriceTyres },
              type
                ? {
                    model: TyreVehicleType,
                    where: {
                      vehicle_type_ua: {
                        [Op.in]: type.split(','),
                      },
                    },
                  }
                : { model: TyreVehicleType },
              speed_index
                ? {
                    model: TyreSpeedIndex,
                    where: {
                      speed_index_with_desc: {
                        [Op.in]: speed_index.split(','),
                      },
                    },
                  }
                : { model: TyreSpeedIndex },
              load_index
                ? {
                    model: TyreLoadIndex,
                    where: {
                      load_index_with_desc: {
                        [Op.in]: load_index.split(','),
                      },
                    },
                  }
                : { model: TyreLoadIndex },
              studded
                ? {
                    model: TyreStudded,
                    where: {
                      studded: {
                        [Op.in]: studded.split(','),
                      },
                    },
                  }
                : { model: TyreStudded },
              run_flat
                ? {
                    model: TyreRunFlat,
                    where: {
                      run_flat: {
                        [Op.in]: run_flat.split(','),
                      },
                    },
                  }
                : { model: TyreRunFlat },
              homologation
                ? {
                    model: TyreHomologation,
                    where: {
                      homologation: {
                        [Op.in]: homologation.split(','),
                      },
                    },
                  }
                : { model: TyreHomologation },
              reinforce
                ? {
                    model: TyreReinforce,
                    where: {
                      reinforce: {
                        [Op.in]: reinforce.split(','),
                      },
                    },
                  }
                : { model: TyreReinforce },
            ],
            order: [
              [
                sequelize.literal(
                  `CASE WHEN price.price = null OR price.price = 0 THEN NULL ELSE 0 END`,
                ),
                'ASC',
              ],
              ['price', 'old_price', 'ASC'],
            ],
          });
        const tyresAllCatCashOld = tyresAllWithCatLimitOld.rows.splice(offset, limit);
        await this.redisService.set(
          'tyres' +
          limit +
          offset +
          width +
          height +
          diameter +
          season +
          brand +
          price +
          type +
          speed_index +
          load_index +
          studded +
          run_flat +
          homologation +
          reinforce +
          sort +
          'catalog',
          1200,
          JSON.stringify(tyresAllCatCashOld),
        );
        return tyresAllCatCashOld;
      }
      if (sort === 'title') {
        const tyresAllWithCatLimitTitle =
          await this.tyresRepository.findAndCountAll({
            include: [
              { model: RatingTyres },
              { model: ReviewTyres },
              //{ model: StockTyres },
              { model: TyreCountry },
              { model: TyreYear },
              { model: Category},
              width
                ? {
                    model: TyreWidth,
                    where: {
                      width: {
                        [Op.in]: width.split(','),
                      },
                    },
                  }
                : { model: TyreWidth },
              height
                ? {
                    model: TyreHeight,
                    where: {
                      height: {
                        [Op.in]: height.split(','),
                      },
                    },
                  }
                : { model: TyreHeight },
              diameter
                ? {
                    model: TyreDiameter,
                    where: {
                      diameter: {
                        [Op.in]: diameter.split(','),
                      },
                    },
                  }
                : { model: TyreDiameter },
              season
                ? {
                    model: TyreSeason,
                    where: {
                      season_ua: {
                        [Op.in]: season.split(','),
                      },
                    },
                  }
                : { model: TyreSeason },
              brand
                ? {
                    model: TyreBrand,
                    where: {
                      brand: {
                        [Op.in]: brand.split(','),
                      },
                    },
                  }
                : { model: TyreBrand },
              price
                ? {
                    model: PriceTyres,
                    where: {
                      price: { [Op.between]: price.split(',') },
                    },
                  }
                : { model: PriceTyres },
              type
                ? {
                    model: TyreVehicleType,
                    where: {
                      vehicle_type_ua: {
                        [Op.in]: type.split(','),
                      },
                    },
                  }
                : { model: TyreVehicleType },
              speed_index
                ? {
                    model: TyreSpeedIndex,
                    where: {
                      speed_index_with_desc: {
                        [Op.in]: speed_index.split(','),
                      },
                    },
                  }
                : { model: TyreSpeedIndex },
              load_index
                ? {
                    model: TyreLoadIndex,
                    where: {
                      load_index_with_desc: {
                        [Op.in]: load_index.split(','),
                      },
                    },
                  }
                : { model: TyreLoadIndex },
              studded
                ? {
                    model: TyreStudded,
                    where: {
                      studded: {
                        [Op.in]: studded.split(','),
                      },
                    },
                  }
                : { model: TyreStudded },
              run_flat
                ? {
                    model: TyreRunFlat,
                    where: {
                      run_flat: {
                        [Op.in]: run_flat.split(','),
                      },
                    },
                  }
                : { model: TyreRunFlat },
              homologation
                ? {
                    model: TyreHomologation,
                    where: {
                      homologation: {
                        [Op.in]: homologation.split(','),
                      },
                    },
                  }
                : { model: TyreHomologation },
              reinforce
                ? {
                    model: TyreReinforce,
                    where: {
                      reinforce: {
                        [Op.in]: reinforce.split(','),
                      },
                    },
                  }
                : { model: TyreReinforce },
            ],
            order: [
              [
                sequelize.literal(
                  `CASE WHEN price.price = null OR price.price = 0 THEN NULL ELSE 0 END`,
                ),
                'ASC',
              ],
              ['full_name', 'ASC'],
            ],
          });
        const tyresAllCatCashTitle = tyresAllWithCatLimitTitle.rows.splice(offset, limit);
        await this.redisService.set(
          'tyres' +
          limit +
          offset +
          width +
          height +
          diameter +
          season +
          brand +
          price +
          type +
          speed_index +
          load_index +
          studded +
          run_flat +
          homologation +
          reinforce +
          sort +
          'catalog',
          1200,
          JSON.stringify(tyresAllCatCashTitle),
        );
        return tyresAllCatCashTitle;
      }
      if (sort === 'rating') {
        const tyresAllWithCatLimitRating =
          await this.tyresRepository.findAndCountAll({
            include: [
              { model: RatingTyres },
              { model: ReviewTyres },
              //{ model: StockTyres },
              { model: TyreCountry },
              { model: TyreYear },
              { model: Category},
              ,
              width
                ? {
                    model: TyreWidth,
                    where: {
                      width: {
                        [Op.in]: width.split(','),
                      },
                    },
                  }
                : { model: TyreWidth },
              height
                ? {
                    model: TyreHeight,
                    where: {
                      height: {
                        [Op.in]: height.split(','),
                      },
                    },
                  }
                : { model: TyreHeight },
              diameter
                ? {
                    model: TyreDiameter,
                    where: {
                      diameter: {
                        [Op.in]: diameter.split(','),
                      },
                    },
                  }
                : { model: TyreDiameter },
              season
                ? {
                    model: TyreSeason,
                    where: {
                      season_ua: {
                        [Op.in]: season.split(','),
                      },
                    },
                  }
                : { model: TyreSeason },
              brand
                ? {
                    model: TyreBrand,
                    where: {
                      brand: {
                        [Op.in]: brand.split(','),
                      },
                    },
                  }
                : { model: TyreBrand },
              price
                ? {
                    model: PriceTyres,
                    where: {
                      price: { [Op.between]: price.split(',') },
                    },
                  }
                : { model: PriceTyres },
              type
                ? {
                    model: TyreVehicleType,
                    where: {
                      vehicle_type_ua: {
                        [Op.in]: type.split(','),
                      },
                    },
                  }
                : { model: TyreVehicleType },
              speed_index
                ? {
                    model: TyreSpeedIndex,
                    where: {
                      speed_index_with_desc: {
                        [Op.in]: speed_index.split(','),
                      },
                    },
                  }
                : { model: TyreSpeedIndex },
              load_index
                ? {
                    model: TyreLoadIndex,
                    where: {
                      load_index_with_desc: {
                        [Op.in]: load_index.split(','),
                      },
                    },
                  }
                : { model: TyreLoadIndex },
              studded
                ? {
                    model: TyreStudded,
                    where: {
                      studded: {
                        [Op.in]: studded.split(','),
                      },
                    },
                  }
                : { model: TyreStudded },
              run_flat
                ? {
                    model: TyreRunFlat,
                    where: {
                      run_flat: {
                        [Op.in]: run_flat.split(','),
                      },
                    },
                  }
                : { model: TyreRunFlat },
              homologation
                ? {
                    model: TyreHomologation,
                    where: {
                      homologation: {
                        [Op.in]: homologation.split(','),
                      },
                    },
                  }
                : { model: TyreHomologation },
              reinforce
                ? {
                    model: TyreReinforce,
                    where: {
                      reinforce: {
                        [Op.in]: reinforce.split(','),
                      },
                    },
                  }
                : { model: TyreReinforce },
            ],
            order: [
              [
                sequelize.literal(
                  `CASE WHEN price.price = null OR price.price = 0 THEN NULL ELSE 0 END`,
                ),
                'ASC',
              ],
              ['rating', 'rating_overall', 'ASC'],
            ],
          });
        const tyresAllCatCashRating = tyresAllWithCatLimitRating.rows.splice(offset, limit);
        await this.redisService.set(
          'tyres' +
          limit +
          offset +
          width +
          height +
          diameter +
          season +
          brand +
          price +
          type +
          speed_index +
          load_index +
          studded +
          run_flat +
          homologation +
          reinforce +
          sort +
          'catalog',
          1200,
          JSON.stringify(tyresAllCatCashRating),
        );
        return tyresAllCatCashRating;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE: ', error);
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }


  async findAllTyresBySeason(season: string) {
    try {
      const tyresAllByseason = await this.tyresRepository.findAll({
        include: [
          //{ all: true },
          { model: TyreSeason, where: { season_ua: season } },
        ],
      });
      return tyresAllByseason;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresByBrand(brand: string) {
    try {
      const tyresAllByBrand = await this.tyresRepository.findAll({
        include: [
          { model: TyreModel },
          // { all: true },
          { model: TyreBrand, where: { brand: brand } },
        ],
        //group:['tyre_model.model', 'ASC']
      });
      return tyresAllByBrand;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresByDiameter(diameter: string) {
    try {
      const tyresAllByDiameter = await this.tyresRepository.findAll({
        include: [
          //{ all: true },
          { model: TyreDiameter, where: { diameter: diameter } },
        ],
      });
      return tyresAllByDiameter;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresByParamsSeason(params: string, season_ua: string) {
    try {
      const tyresAllByParamsSeason = await this.tyresRepository.findAll({
        include: [
          //{ all: true },
          { model: ReviewTyres },
          { model: RatingTyres },
          { model: PriceTyres },
          { model: StockTyres },
          { model: TyreYear },
          { model: TyreCountry },
          { model: TyreVehicleType },
          { model: TyreSeason },
          { model: TyreSizeDigits },
          { model: TyreBrand },
          { model: Category},
          { model: TyreParams, where: { params: params } },
          { model: TyreSeason, where: { season_ua: season_ua } },
        ],
      });
      return tyresAllByParamsSeason;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresByBrandParamsSeason(
    params: string,
    brand: string,
    season_ua: string,
  ) {
    try {
      const tyresAllByBrandParamsSeason = await this.tyresRepository.findAll({
        include: [
          //{ all: true },
          { model: ReviewTyres },
          { model: RatingTyres },
          { model: PriceTyres },
          { model: StockTyres },
          { model: TyreYear },
          { model: TyreCountry },
          { model: TyreVehicleType },
          { model: TyreSeason },
          { model: TyreSizeDigits },
          { model: TyreBrand },
          { model: Category},
          { model: TyreParams, where: { params: params } },
          { model: TyreBrand, where: { brand: brand } },
          { model: TyreSeason, where: { season_ua: season_ua } },
        ],
      });
      return tyresAllByBrandParamsSeason;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresByBrandModel(brand: string, model: string) {
    try {
      const tyresAllByBrandModel = await this.tyresRepository.findAll({
        include: [
          //{ all: true },
          { model: ReviewTyres },
          { model: RatingTyres },
          { model: PriceTyres },
          { model: StockTyres },
          { model: TyreYear },
          { model: TyreCountry },
          { model: TyreVehicleType },
          { model: TyreSeason },
          { model: TyreSizeDigits },
          { model: TyreBrand },
          { model: Category},
          { model: TyreBrand, where: { brand: brand } },
          { model: TyreModel, where: { model: model } },
        ],
      });
      return tyresAllByBrandModel;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresByParams(params: string) {
    try {
      const tyresAllByParams = await this.tyresRepository.findAll({
        include: [
          //{ all: true },
          { model: TyreParams, where: { params: params } },
        ],
      });
      return tyresAllByParams;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresByFullName(fullname: string) {
    try {
      const tyresOneByFullname = await this.tyresRepository.findOne({
        where: { full_name: fullname },
        include: { all: true },
      });
      return tyresOneByFullname;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findTyresById(getTyreDto: GetTyreDto) {
    try {
      const tyresId = await this.tyresRepository.findByPk(getTyreDto.id, {
        include: { all: true },
      });

      return tyresId;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findTyresByIdQuery(id: string) {
    try {
      const tyresIdQuery = await this.tyresRepository.findByPk(id, {
        include: { all: true },
      });
      return tyresIdQuery;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findTyresByIdParam(id: string) {
    try {
      const tyresIdParam = await this.tyresRepository.findByPk(id, {
        include: { all: true },
      });
      return tyresIdParam;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findTyresByIdPrice(id: number) {
    try {
      const tyresId = await this.tyresRepository.findByPk(id, {
        include: { all: true },
      });

      return tyresId;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAndCountAllTyres(
    width: string,
    height: string,
    diameter: string,
    season: string,
    brand: string,
    price: string,
    type: string,
    speed_index: string,
    load_index: string,
    studded: string,
    run_flat: string,
    homologation: string,
    reinforce: string,
  ) {
    try {
      const tyresCountAll = await this.tyresRepository.findAndCountAll({
        include: [
          //{ all: true },
          width
            ? {
                model: TyreWidth,
                where: {
                  width: {
                    [Op.in]: width.split(','),
                  },
                },
              }
            : { model: TyreWidth },
          height
            ? {
                model: TyreHeight,
                where: {
                  height: {
                    [Op.in]: height.split(','),
                  },
                },
              }
            : { model: TyreHeight },
          diameter
            ? {
                model: TyreDiameter,
                where: {
                  diameter: {
                    [Op.in]: diameter.split(','),
                  },
                },
              }
            : { model: TyreDiameter },
          season
            ? {
                model: TyreSeason,
                where: {
                  season_ua: {
                    [Op.in]: season.split(','),
                  },
                },
              }
            : { model: TyreSeason },
          brand
            ? {
                model: TyreBrand,
                where: {
                  brand: {
                    [Op.in]: brand.split(','),
                  },
                },
              }
            : { model: TyreBrand },
          price
            ? {
                model: PriceTyres,
                where: {
                  price: { [Op.between]: price.split(',') },
                },
              }
            : { model: PriceTyres },
          type
            ? {
                model: TyreVehicleType,
                where: {
                  vehicle_type_ua: {
                    [Op.in]: type.split(','),
                  },
                },
              }
            : { model: TyreVehicleType },
          speed_index
            ? {
                model: TyreSpeedIndex,
                where: {
                  speed_index_with_desc: {
                    [Op.in]: speed_index.split(','),
                  },
                },
              }
            : { model: TyreSpeedIndex },
          load_index
            ? {
                model: TyreLoadIndex,
                where: {
                  load_index_with_desc: {
                    [Op.in]: load_index.split(','),
                  },
                },
              }
            : { model: TyreLoadIndex },
          studded
            ? {
                model: TyreStudded,
                where: {
                  studded: {
                    [Op.in]: studded.split(','),
                  },
                },
              }
            : { model: TyreStudded },
          run_flat
            ? {
                model: TyreRunFlat,
                where: {
                  run_flat: {
                    [Op.in]: run_flat.split(','),
                  },
                },
              }
            : { model: TyreRunFlat },
          homologation
            ? {
                model: TyreHomologation,
                where: {
                  homologation: {
                    [Op.in]: homologation.split(','),
                  },
                },
              }
            : { model: TyreHomologation },
          reinforce
            ? {
                model: TyreReinforce,
                where: {
                  reinforce: {
                    [Op.in]: reinforce.split(','),
                  },
                },
              }
            : { model: TyreReinforce },
        ],
      });

      return tyresCountAll.rows.length;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateTyres(updateTyreDto: UpdateTyreDto) {
    try {
      const tyresId = await this.tyresRepository.findByPk(updateTyreDto.id, {
        //include: { all: true },
      });
      if (tyresId) {
        await this.tyresRepository.update(
          {
            full_name: updateTyreDto.full_name,
            photo_url: updateTyreDto.photo_url,
            //update_date : updateTyreDto.update_date
          },
          { where: { id: updateTyreDto.id } },
        );

        tyresId.save();
        //const updateTyres = await this.tyresRepository.findByPk(updateTyreDto.id, {include: {all: true}});

        return tyresId;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async remove(getTyreDto: GetTyreDto) {
    try {
      const removeTyres = await this.tyresRepository.destroy({
        where: { id: getTyreDto.id },
      });
      return removeTyres;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
