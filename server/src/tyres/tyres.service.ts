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
import { TyreModel } from '../properties/entities/tyres/tyre-model.model';
import { RatingTyres } from '../ratings/entities/rating-tyres.model';
import { ReviewTyres } from '../reviews/entities/review-tyres.model';
import { TyreCountry } from '../properties/entities/tyres/tyre-country.model';
import { TyreYear } from '../properties/entities/tyres/tyre-year.model';
import { TyreSizeDigits } from '../properties/entities/tyres/tyre-sizeDigits.model';
import { RedisService } from '../redis/redis.service';
import { Category } from '../categorys/entities/category.model';
import { StringTransformService } from './stringTransform';

@Injectable()
export class TyresService {
  constructor(
    @InjectModel(Tyres) private tyresRepository: typeof Tyres,
    private readonly redisService: RedisService,
    private readonly translitService: StringTransformService
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
          { model: Category },
          { model: TyreDiameter },
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
      const cachedTyresAllAdmin = await this.redisService.get('tyresAllAdmin');
      if (cachedTyresAllAdmin) {
        return cachedTyresAllAdmin;
      }
      const tyresAllAdmin = await this.tyresRepository.findAll({
        include: [
          { model: TyreYear },
          { model: TyreCountry },
          { model: TyreVehicleType },
          { model: TyreSeason },
          { model: PriceTyres },
          { model: StockTyres },
          { model: TyreBrand },
          { model: Category },
        ],
      });
      await this.redisService.set(
        'tyresAllAdmin',
        3600,
        JSON.stringify(tyresAllAdmin),
      );
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
              { model: Category },
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
                      [Op.or]: [
                        { season_ua: { [Op.in]: season.split(',') } },
                        { season: { [Op.in]: season.split(',') } },
                      ],
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
          86400,
          JSON.stringify(tyresAllWithoutLimitMain),
        );
        return tyresAllWithoutLimitMain;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE_MAIN: ', error);
      throw new HttpException(
        //'Data is incorrect or Not Found',
        error.message,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyresWithoutOffset(
    price: string,
    type: string,
    speed_index: string,
    load_index: string,
    sort: string,
  ): Promise<any> {
    try {
      const cachedTyresAll = await this.redisService.get(
        'tyrefilter' +
          price +
          type +
          speed_index +
          load_index +
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
                      [Op.or]: [
                        { vehicle_type_ua: { [Op.in]: type.split(',') } },
                        { vehicle_type: { [Op.in]: type.split(',') } },
                      ],
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
            ],
          });
        await this.redisService.set(
          'tyrefilter' +
            price +
            type +
            speed_index +
            load_index +
            sort +
            'middle',
          86400,
          JSON.stringify(tyresAllWithoutLimitTyreProps),
        );
        return tyresAllWithoutLimitTyreProps;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE_MIDDLE: ', error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
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
          86400,
          JSON.stringify(tyresAllWithoutLimitTyreProps),
        );
        return tyresAllWithoutLimitTyreProps;
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE_PROPS: ', error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
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
              { model: Category },
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
                      [Op.or]: [{ season_ua: {[Op.in]: season.split(',')}}, { season: {[Op.in]: season.split(',')}}],
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
                      [Op.or]: [{ vehicle_type_ua: {[Op.in]: type.split(',')}}, { vehicle_type: {[Op.in]: type.split(',')}}],
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
        const tyresAllCatCashAsc = tyresAllWithIdForCatalog.rows.splice(
          offset,
          limit,
        );
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
          JSON.stringify({ rows: tyresAllCatCashAsc, count: lengthTyresAll }),
        );
        return { rows: tyresAllCatCashAsc, count: lengthTyresAll };
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
              { model: Category },
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
                      [Op.or]: [{ season_ua: {[Op.in]: season.split(',')}}, { season: {[Op.in]: season.split(',')}}],
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
                      [Op.or]: [{ vehicle_type_ua: {[Op.in]: type.split(',')}}, { vehicle_type: {[Op.in]: type.split(',')}}],
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
        const lengthTyresAllDesc = tyresAllWithCatLimitDesc.rows.length;
        const tyresAllCatCashDesc = tyresAllWithCatLimitDesc.rows.splice(
          offset,
          limit,
        );
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
          JSON.stringify({
            rows: tyresAllCatCashDesc,
            count: lengthTyresAllDesc,
          }),
        );
        return { rows: tyresAllCatCashDesc, count: lengthTyresAllDesc };
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
              { model: Category },
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
                      [Op.or]: [{ season_ua: {[Op.in]: season.split(',')}}, { season: {[Op.in]: season.split(',')}}],
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
                      [Op.or]: [{ vehicle_type_ua: {[Op.in]: type.split(',')}}, { vehicle_type: {[Op.in]: type.split(',')}}],
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
        const lengthTyresAllOld = tyresAllWithCatLimitOld.rows.length;
        const tyresAllCatCashOld = tyresAllWithCatLimitOld.rows.splice(
          offset,
          limit,
        );
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
          JSON.stringify({
            rows: tyresAllCatCashOld,
            count: lengthTyresAllOld,
          }),
        );
        return { rows: tyresAllCatCashOld, count: lengthTyresAllOld };
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
              { model: Category },
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
                      [Op.or]: [{ season_ua: {[Op.in]: season.split(',')}}, { season: {[Op.in]: season.split(',')}}],
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
                      [Op.or]: [{ vehicle_type_ua: {[Op.in]: type.split(',')}}, { vehicle_type: {[Op.in]: type.split(',')}}],
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
        const lengthTyresAllTitle = tyresAllWithCatLimitTitle.rows.length;
        const tyresAllCatCashTitle = tyresAllWithCatLimitTitle.rows.splice(
          offset,
          limit,
        );
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
          JSON.stringify({
            rows: tyresAllCatCashTitle,
            count: lengthTyresAllTitle,
          }),
        );
        return { rows: tyresAllCatCashTitle, count: lengthTyresAllTitle };
      }
      if (sort === 'rating') {
        const tyresAllWithCatLimitRating =
          await this.tyresRepository.findAndCountAll({
            include: [
              { model: RatingTyres, as: 'rating', attributes: [] },
              { model: ReviewTyres },
              //{ model: StockTyres },
              { model: TyreCountry },
              { model: TyreYear },
              { model: Category },
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
                      [Op.or]: [{ season_ua: {[Op.in]: season.split(',')}}, { season: {[Op.in]: season.split(',')}}],
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
                      [Op.or]: [{ vehicle_type_ua: {[Op.in]: type.split(',')}}, { vehicle_type: {[Op.in]: type.split(',')}}],
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
            attributes: {
              include: [
                [
                  sequelize.fn('avg', sequelize.col('rating.rating_overall')),
                  'avg_rating',
                ],
              ],
            },
            order: [
              [
                sequelize.literal(
                  `CASE WHEN price.price = null OR price.price = 0 THEN NULL ELSE 0 END`,
                ),
                'ASC',
              ],
              ['avg_rating', 'DESC NULLS LAST'],
            ],
            group: [
              'Tyres.id',
              'reviews.id_review',
              'country.id_country',
              'year.id_year',
              'category.id_cat',
              'width.id_width',
              'height.id_height',
              'diameter.id_diameter',
              'season.id_season',
              'tyre_brand.id_brand',
              'price.id',
              'vehicle_type.id_vehicle_type',
              'speed_index.id_speed_index',
              'load_index.id_load_index',
              'studded.id_studded',
              'run_flat.id_run_flat',
              'homologation.id_homologation',
              'reinforce.id_reinforce',
            ],
          });
        const lengthTyresAllRating = tyresAllWithCatLimitRating.rows.length;
        const tyresAllCatCashRating = tyresAllWithCatLimitRating.rows.splice(
          offset,
          limit,
        );
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
          JSON.stringify({
            rows: tyresAllCatCashRating,
            count: lengthTyresAllRating,
          }),
        );
        return { rows: tyresAllCatCashRating, count: lengthTyresAllRating };
      }
    } catch (error) {
      console.log('ERROR_GET_TYRE_CAT: ', error);
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
          { model: Category },
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
          { model: Category },
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
          { model: Category },
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
      const get_all_tyres = await this.tyresRepository.findAll();
      const getTyre = get_all_tyres.find((item: any) =>
        this.translitService.createStringUrl(item.full_name) == fullname
      );
      if (getTyre) {
        const getTyresId = await this.tyresRepository.findByPk(getTyre.id, {
          include: { all: true },
        });
        if (getTyresId) {
          return getTyresId;
        } else {
          return null;
        }
      } else {
        return null;
      }
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
