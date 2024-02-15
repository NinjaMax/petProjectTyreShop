import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateWheelDto } from './dto/create-wheel.dto';
import { GetWheelDto } from './dto/get-wheel.dto';
import { UpdateWheelDto } from './dto/update-wheel.dto';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { Wheel } from './entities/wheel.model';
import { WheelWidth } from '../properties/entities/wheels/wheel-width.model';
import { WheelDiameter } from '../properties/entities/wheels/wheel-diameter.model';
import { WheelBoltCount } from '../properties/entities/wheels/wheel-boltCount.model';
import { WheelBrand } from '../properties/entities/wheels/wheel-brand.model';
import { PriceWheels } from '../prices/entities/price-wheels.model';
import { WheelType } from '../properties/entities/wheels/wheel-type.model';
import { WheelColor } from '../properties/entities/wheels/wheel-color.model';
import { WheelDia } from '../properties/entities/wheels/wheel-dia.model';
import { WheelEt } from '../properties/entities/wheels/wheel-et.model';
import { WheelPcd } from '../properties/entities/wheels/wheel-pcd.model';
import { WheelPcd2 } from '../properties/entities/wheels/wheel-pcd2.model';
import { WheelBoltCountPcd } from '../properties/entities/wheels/wheel-boltCountPcd.model';
import { WheelModel } from '../properties/entities/wheels/wheel-model.model';
import { StockWheels } from '../stock/entities/stock-wheels.model';
import { ReviewWheels } from '../reviews/entities/review-wheels.model';
import { RatingWheels } from '../ratings/entities/rating-wheels.model';
import { RedisService } from '../redis/redis.service';
import { Category } from '../categorys/entities/category.model';
import { WheelSizeDigits } from 'src/properties/entities/wheels/wheel-sizeDigits.model';
import { StringTransformService } from './stringTransform';

@Injectable()
export class WheelsService {
  constructor(
    @InjectModel(Wheel) private wheelRepository: typeof Wheel,
    private readonly redisService: RedisService,
    private translitService: StringTransformService,
  ) {}

  async createWheel(createWheelDto: CreateWheelDto) {
    try {
      const wheel = await this.wheelRepository.create(createWheelDto);

      return wheel;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createWheelFromPrice(
    id: number,
    id_sup: string,
    full_name: string,
    full_name_color: string,
    full_name_hotline: string,
    photo_url: string,
    update_date: Date,
  ) {
    try {
      const [wheelsIdFromPrice, created] =
        await this.wheelRepository.findOrCreate({
          where: { id: id },
          defaults: {
            id: id,
            id_goods_sup: id_sup,
            full_name: full_name,
            full_name_color: full_name_color,
            full_name_hotline: full_name_hotline,
            photo_url: photo_url,
            update_date: update_date,
          },
        });

      if (!created) {
        await wheelsIdFromPrice.update(
          {
            id_goods_sup: id_sup,
            // full_name: full_name,
            // full_name_color: full_name_color,
            // full_name_hotline: full_name_hotline,
            //photo_url: photo_url,
            update_date: update_date,
          },
          { where: { id: wheelsIdFromPrice.id } },
        );

        return wheelsIdFromPrice;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllWheels() {
    try {
      const wheelsAll = await this.wheelRepository.findAll({
        include: [
          { model: RatingWheels },
          { model: ReviewWheels },
          { model: StockWheels },
          { model: Category },
          { model: PriceWheels },
          { model: WheelType },
          { model: WheelSizeDigits },
        ],
      });

      return wheelsAll;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllWheelsAdmin() {
    try {
      const wheelsAllAdmin = await this.wheelRepository.findAll({
        include: [
          { model: Category },
          { model: WheelType },
          { model: WheelColor },
          { model: WheelBrand },
          { model: WheelSizeDigits },
          { model: PriceWheels },
          { model: StockWheels },
        ],
      });

      return wheelsAllAdmin;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findWheelById(getWheelDto: GetWheelDto) {
    try {
      const wheelById = await this.wheelRepository.findByPk(getWheelDto.id, {
        include: { all: true },
      });

      return wheelById;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findWheelByIdQuery(id: string) {
    try {
      const wheelByIdQuery = await this.wheelRepository.findByPk(id, {
        include: { all: true },
      });

      return wheelByIdQuery;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findWheelOne(getWheelDto: GetWheelDto) {
    try {
      const wheelById = await this.wheelRepository.findOne({
        where: { id: getWheelDto.id },
      });

      return wheelById;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findWheelByIdPrice(id: number) {
    try {
      const wheelById = await this.wheelRepository.findByPk(id, {
        include: { all: true },
      });

      return wheelById;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllWheelsMainOffset(
    width: string,
    diameter: string,
    bolt_count: string,
    brand: string,
    type: string,
    sort: string,
  ) {
    try {
      const cachedWheelsMain = await this.redisService.get(
        'wheel' + width + diameter + bolt_count + brand + type + sort + 'main',
      );
      if (cachedWheelsMain) {
        return cachedWheelsMain;
      }
      if (sort === 'ASC') {
        const wheelsAllWithoutLimitMain =
          await this.wheelRepository.findAndCountAll({
            include: [
              width
                ? {
                    model: WheelWidth,
                    where: {
                      width: {
                        [Op.in]: width.split(','),
                      },
                    },
                  }
                : { model: WheelWidth },
              diameter
                ? {
                    model: WheelDiameter,
                    where: {
                      diameter: {
                        [Op.in]: diameter.split(','),
                      },
                    },
                  }
                : { model: WheelDiameter },
              bolt_count
                ? {
                    model: WheelBoltCount,
                    where: {
                      bolt_count: {
                        [Op.in]: bolt_count.split(','),
                      },
                    },
                  }
                : { model: WheelBoltCount },
              brand
                ? {
                    model: WheelBrand,
                    where: {
                      brand: {
                        [Op.in]: brand.split(','),
                      },
                    },
                  }
                : { model: WheelBrand },
              type
                ? {
                    model: WheelType,
                    where: {
                      type: {
                        [Op.in]: type.split(','),
                      },
                    },
                  }
                : { model: WheelType },
            ],
          });
        await this.redisService.set(
          'wheel' +
            width +
            diameter +
            bolt_count +
            brand +
            type +
            sort +
            'main',
          86400,
          JSON.stringify(wheelsAllWithoutLimitMain),
        );
        return wheelsAllWithoutLimitMain;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllWheelsWithoutOffset(
    width: string,
    diameter: string,
    bolt_count: string,
    bolt_count_pcd: string,
    brand: string,
    price: string,
    type: string,
    color: string,
    dia: string,
    et: string,
    pcd: string,
    pcd2: string,
    sort: string,
  ) {
    try {
      const cachedTyres = await this.redisService.get(
          width +
          diameter +
          bolt_count +
          bolt_count_pcd +
          brand +
          price +
          type +
          color +
          dia +
          et +
          pcd +
          pcd2 +
          sort +
          'wheel_props',
      );
      if (cachedTyres) {
        return cachedTyres;
      }
      if (sort === 'ASC') {
        const wheelsAllWithoutLimitC =
          await this.wheelRepository.findAndCountAll({
            include: [
              width
                ? {
                    model: WheelWidth,
                    where: {
                      width: {
                        [Op.in]: width.split(','),
                      },
                    },
                  }
                : { model: WheelWidth },
              diameter
                ? {
                    model: WheelDiameter,
                    where: {
                      diameter: {
                        [Op.in]: diameter.split(','),
                      },
                    },
                  }
                : { model: WheelDiameter },
              bolt_count
                ? {
                    model: WheelBoltCount,
                    where: {
                      bolt_count: {
                        [Op.in]: bolt_count.split(','),
                      },
                    },
                  }
                : { model: WheelBoltCount },
              bolt_count_pcd
                ? {
                    model: WheelBoltCountPcd,
                    where: {
                      bolt_count_pcd: {
                        [Op.in]: bolt_count_pcd.split(','),
                      },
                    },
                  }
                : { model: WheelBoltCountPcd },
              brand
                ? {
                    model: WheelBrand,
                    where: {
                      brand: {
                        [Op.in]: brand.split(','),
                      },
                    },
                  }
                : { model: WheelBrand },
              price
                ? {
                    model: PriceWheels,
                    where: {
                      price: { [Op.between]: price.split(',') },
                    },
                  }
                : { model: PriceWheels },
              type
                ? {
                    model: WheelType,
                    where: {
                      type: {
                        [Op.in]: type.split(','),
                      },
                    },
                  }
                : { model: WheelType },
              color
                ? {
                    model: WheelColor,
                    where: {
                      color: {
                        [Op.in]: color.split(','),
                      },
                    },
                  }
                : { model: WheelColor },
              dia
                ? {
                    model: WheelDia,
                    where: {
                      dia: {
                        [Op.in]: dia.split(','),
                      },
                    },
                  }
                : { model: WheelDia },
              et
                ? {
                    model: WheelEt,
                    where: {
                      et: {
                        [Op.in]: et.split(','),
                      },
                    },
                  }
                : { model: WheelEt },
              pcd
                ? {
                    model: WheelPcd,
                    where: {
                      pcd: {
                        [Op.in]: pcd.split(','),
                      },
                    },
                  }
                : { model: WheelPcd },
              pcd2
                ? {
                    model: WheelPcd2,
                    where: {
                      pcd2: {
                        [Op.in]: pcd2.split(','),
                      },
                    },
                  }
                : { model: WheelPcd2 },
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
        await this.redisService.set(
            width +
            diameter +
            bolt_count +
            bolt_count_pcd +
            brand +
            price +
            type +
            color +
            dia +
            et +
            pcd +
            pcd2 +
            sort +
            'wheel_props',
          3600,
          JSON.stringify(wheelsAllWithoutLimitC),
        );
        return wheelsAllWithoutLimitC;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllWheelsWithCatOffset(
    limit: number,
    offset: number,
    width: string,
    diameter: string,
    bolt_count: string,
    bolt_count_pcd: string,
    brand: string,
    price: string,
    type: string,
    color: string,
    dia: string,
    et: string,
    pcd: string,
    pcd2: string,
    sort: string,
  ) {
    try {
      const cachedWheels = await this.redisService.get(
        'wheel' +
          limit +
          offset +
          width +
          diameter +
          bolt_count +
          bolt_count_pcd +
          brand +
          price +
          type +
          color +
          dia +
          et +
          pcd +
          pcd2 +
          sort +
          'catalog',
      );
      if (cachedWheels) {
        return cachedWheels;
      }
      if (sort === 'ASC') {
        const wheelsAllWithLimitCat =
          await this.wheelRepository.findAndCountAll({
            include: [
              { model: RatingWheels },
              { model: ReviewWheels },
              { model: StockWheels },
              { model: Category },
              // { all: true },
              width
                ? {
                    model: WheelWidth,
                    where: {
                      width: {
                        [Op.in]: width.split(','),
                      },
                    },
                  }
                : { model: WheelWidth },
              diameter
                ? {
                    model: WheelDiameter,
                    where: {
                      diameter: {
                        [Op.in]: diameter.split(','),
                      },
                    },
                  }
                : { model: WheelDiameter },
              bolt_count
                ? {
                    model: WheelBoltCount,
                    where: {
                      bolt_count: {
                        [Op.in]: bolt_count.split(','),
                      },
                    },
                  }
                : { model: WheelBoltCount },
              bolt_count_pcd
                ? {
                    model: WheelBoltCountPcd,
                    where: {
                      bolt_count_pcd: {
                        [Op.in]: bolt_count_pcd.split(','),
                      },
                    },
                  }
                : { model: WheelBoltCountPcd },
              brand
                ? {
                    model: WheelBrand,
                    where: {
                      brand: {
                        [Op.in]: brand.split(','),
                      },
                    },
                  }
                : { model: WheelBrand },
              price
                ? {
                    model: PriceWheels,
                    where: {
                      price: { [Op.between]: price.split(',') },
                    },
                  }
                : { model: PriceWheels },
              type
                ? {
                    model: WheelType,
                    where: {
                      type: {
                        [Op.in]: type.split(','),
                      },
                    },
                  }
                : { model: WheelType },
              color
                ? {
                    model: WheelColor,
                    where: {
                      color: {
                        [Op.in]: color.split(','),
                      },
                    },
                  }
                : { model: WheelColor },
              dia
                ? {
                    model: WheelDia,
                    where: {
                      dia: {
                        [Op.in]: dia.split(','),
                      },
                    },
                  }
                : { model: WheelDia },
              et
                ? {
                    model: WheelEt,
                    where: {
                      et: {
                        [Op.in]: et.split(','),
                      },
                    },
                  }
                : { model: WheelEt },
              pcd
                ? {
                    model: WheelPcd,
                    where: {
                      pcd: {
                        [Op.in]: pcd.split(','),
                      },
                    },
                  }
                : { model: WheelPcd },
              pcd2
                ? {
                    model: WheelPcd2,
                    where: {
                      pcd2: {
                        [Op.in]: pcd2.split(','),
                      },
                    },
                  }
                : { model: WheelPcd2 },
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
        await this.redisService.set(
          'wheel' +
          limit +
          offset +
          width +
          diameter +
          bolt_count +
          bolt_count_pcd +
          brand +
          price +
          type +
          color +
          dia +
          et +
          pcd +
          pcd2 +
          sort +
          'catalog',
          3600,
          JSON.stringify(wheelsAllWithLimitCat.rows.splice(offset, limit)),
        );
        return wheelsAllWithLimitCat.rows.splice(offset, limit);
      }
      if (sort === 'DESC') {
        const wheelsAllWithCatLimitDesc =
          await this.wheelRepository.findAndCountAll({
            include: [
              // { all: true },
              { model: RatingWheels },
              { model: ReviewWheels },
              { model: StockWheels },
              { model: Category },
              width
                ? {
                    model: WheelWidth,
                    where: {
                      width: {
                        [Op.in]: width.split(','),
                      },
                    },
                  }
                : { model: WheelWidth },
              diameter
                ? {
                    model: WheelDiameter,
                    where: {
                      diameter: {
                        [Op.in]: diameter.split(','),
                      },
                    },
                  }
                : { model: WheelDiameter },
              bolt_count
                ? {
                    model: WheelBoltCount,
                    where: {
                      bolt_count: {
                        [Op.in]: bolt_count.split(','),
                      },
                    },
                  }
                : { model: WheelBoltCount },
              bolt_count_pcd
                ? {
                    model: WheelBoltCountPcd,
                    where: {
                      bolt_count_pcd: {
                        [Op.in]: bolt_count_pcd.split(','),
                      },
                    },
                  }
                : { model: WheelBoltCountPcd },
              brand
                ? {
                    model: WheelBrand,
                    where: {
                      brand: {
                        [Op.in]: brand.split(','),
                      },
                    },
                  }
                : { model: WheelBrand },
              price
                ? {
                    model: PriceWheels,
                    where: {
                      price: { [Op.between]: price.split(',') },
                    },
                  }
                : { model: PriceWheels },
              type
                ? {
                    model: WheelType,
                    where: {
                      type: {
                        [Op.in]: type.split(','),
                      },
                    },
                  }
                : { model: WheelType },
              color
                ? {
                    model: WheelColor,
                    where: {
                      color: {
                        [Op.in]: color.split(','),
                      },
                    },
                  }
                : { model: WheelColor },
              dia
                ? {
                    model: WheelDia,
                    where: {
                      dia: {
                        [Op.in]: dia.split(','),
                      },
                    },
                  }
                : { model: WheelDia },
              et
                ? {
                    model: WheelEt,
                    where: {
                      et: {
                        [Op.in]: et.split(','),
                      },
                    },
                  }
                : { model: WheelEt },
              pcd
                ? {
                    model: WheelPcd,
                    where: {
                      pcd: {
                        [Op.in]: pcd.split(','),
                      },
                    },
                  }
                : { model: WheelPcd },
              pcd2
                ? {
                    model: WheelPcd2,
                    where: {
                      pcd2: {
                        [Op.in]: pcd2.split(','),
                      },
                    },
                  }
                : { model: WheelPcd2 },
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
        await this.redisService.set(
          'wheel' +
          limit +
          offset +
          width +
          diameter +
          bolt_count +
          bolt_count_pcd +
          brand +
          price +
          type +
          color +
          dia +
          et +
          pcd +
          pcd2 +
          sort +
          'catalog',
          3600,
          JSON.stringify(wheelsAllWithCatLimitDesc.rows.splice(offset, limit)),
        );
        return wheelsAllWithCatLimitDesc.rows.splice(offset, limit);
      }
      if (sort === 'oldPrice') {
        const wheelsAllWithCatLimitOld =
          await this.wheelRepository.findAndCountAll({
            include: [
              // { all: true },
              { model: RatingWheels },
              { model: ReviewWheels },
              { model: StockWheels },
              { model: Category },
              width
                ? {
                    model: WheelWidth,
                    where: {
                      width: {
                        [Op.in]: width.split(','),
                      },
                    },
                  }
                : { model: WheelWidth },
              diameter
                ? {
                    model: WheelDiameter,
                    where: {
                      diameter: {
                        [Op.in]: diameter.split(','),
                      },
                    },
                  }
                : { model: WheelDiameter },
              bolt_count
                ? {
                    model: WheelBoltCount,
                    where: {
                      bolt_count: {
                        [Op.in]: bolt_count.split(','),
                      },
                    },
                  }
                : { model: WheelBoltCount },
              bolt_count_pcd
                ? {
                    model: WheelBoltCountPcd,
                    where: {
                      bolt_count_pcd: {
                        [Op.in]: bolt_count_pcd.split(','),
                      },
                    },
                  }
                : { model: WheelBoltCountPcd },
              brand
                ? {
                    model: WheelBrand,
                    where: {
                      brand: {
                        [Op.in]: brand.split(','),
                      },
                    },
                  }
                : { model: WheelBrand },
              price
                ? {
                    model: PriceWheels,
                    where: {
                      price: { [Op.between]: price.split(',') },
                    },
                  }
                : { model: PriceWheels },
              type
                ? {
                    model: WheelType,
                    where: {
                      type: {
                        [Op.in]: type.split(','),
                      },
                    },
                  }
                : { model: WheelType },
              color
                ? {
                    model: WheelColor,
                    where: {
                      color: {
                        [Op.in]: color.split(','),
                      },
                    },
                  }
                : { model: WheelColor },
              dia
                ? {
                    model: WheelDia,
                    where: {
                      dia: {
                        [Op.in]: dia.split(','),
                      },
                    },
                  }
                : { model: WheelDia },
              et
                ? {
                    model: WheelEt,
                    where: {
                      et: {
                        [Op.in]: et.split(','),
                      },
                    },
                  }
                : { model: WheelEt },
              pcd
                ? {
                    model: WheelPcd,
                    where: {
                      pcd: {
                        [Op.in]: pcd.split(','),
                      },
                    },
                  }
                : { model: WheelPcd },
              pcd2
                ? {
                    model: WheelPcd2,
                    where: {
                      pcd2: {
                        [Op.in]: pcd2.split(','),
                      },
                    },
                  }
                : { model: WheelPcd2 },
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
        await this.redisService.set(
          'wheel' +
          limit +
          offset +
          width +
          diameter +
          bolt_count +
          bolt_count_pcd +
          brand +
          price +
          type +
          color +
          dia +
          et +
          pcd +
          pcd2 +
          sort +
          'catalog',
          3600,
          JSON.stringify(wheelsAllWithCatLimitOld.rows.splice(offset, limit)),
        );
        return wheelsAllWithCatLimitOld.rows.splice(offset, limit);
      }
      if (sort === 'title') {
        const wheelsAllWithCatLimitTitle =
          await this.wheelRepository.findAndCountAll({
            include: [
              // { all: true },
              { model: RatingWheels },
              { model: ReviewWheels },
              { model: StockWheels },
              { model: Category },
              width
                ? {
                    model: WheelWidth,
                    where: {
                      width: {
                        [Op.in]: width.split(','),
                      },
                    },
                  }
                : { model: WheelWidth },
              diameter
                ? {
                    model: WheelDiameter,
                    where: {
                      diameter: {
                        [Op.in]: diameter.split(','),
                      },
                    },
                  }
                : { model: WheelDiameter },
              bolt_count
                ? {
                    model: WheelBoltCount,
                    where: {
                      bolt_count: {
                        [Op.in]: bolt_count.split(','),
                      },
                    },
                  }
                : { model: WheelBoltCount },
              bolt_count_pcd
                ? {
                    model: WheelBoltCountPcd,
                    where: {
                      bolt_count_pcd: {
                        [Op.in]: bolt_count_pcd.split(','),
                      },
                    },
                  }
                : { model: WheelBoltCountPcd },
              brand
                ? {
                    model: WheelBrand,
                    where: {
                      brand: {
                        [Op.in]: brand.split(','),
                      },
                    },
                  }
                : { model: WheelBrand },
              price
                ? {
                    model: PriceWheels,
                    where: {
                      price: { [Op.between]: price.split(',') },
                    },
                  }
                : { model: PriceWheels },
              type
                ? {
                    model: WheelType,
                    where: {
                      type: {
                        [Op.in]: type.split(','),
                      },
                    },
                  }
                : { model: WheelType },
              color
                ? {
                    model: WheelColor,
                    where: {
                      color: {
                        [Op.in]: color.split(','),
                      },
                    },
                  }
                : { model: WheelColor },
              dia
                ? {
                    model: WheelDia,
                    where: {
                      dia: {
                        [Op.in]: dia.split(','),
                      },
                    },
                  }
                : { model: WheelDia },
              et
                ? {
                    model: WheelEt,
                    where: {
                      et: {
                        [Op.in]: et.split(','),
                      },
                    },
                  }
                : { model: WheelEt },
              pcd
                ? {
                    model: WheelPcd,
                    where: {
                      pcd: {
                        [Op.in]: pcd.split(','),
                      },
                    },
                  }
                : { model: WheelPcd },
              pcd2
                ? {
                    model: WheelPcd2,
                    where: {
                      pcd2: {
                        [Op.in]: pcd2.split(','),
                      },
                    },
                  }
                : { model: WheelPcd2 },
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
        await this.redisService.set(
          'wheel' +
          limit +
          offset +
          width +
          diameter +
          bolt_count +
          bolt_count_pcd +
          brand +
          price +
          type +
          color +
          dia +
          et +
          pcd +
          pcd2 +
          sort +
          'catalog',
          3600,
          JSON.stringify(wheelsAllWithCatLimitTitle.rows.splice(offset, limit)),
        );
        return wheelsAllWithCatLimitTitle.rows.splice(offset, limit);
      }
      if (sort === 'rating') {
        const wheelsAllWithCatLimitRating =
          await this.wheelRepository.findAndCountAll({
            include: [
              // { all: true },
              { model: RatingWheels },
              { model: ReviewWheels },
              { model: StockWheels },
              { model: Category },
              width
                ? {
                    model: WheelWidth,
                    where: {
                      width: {
                        [Op.in]: width.split(','),
                      },
                    },
                  }
                : { model: WheelWidth },
              diameter
                ? {
                    model: WheelDiameter,
                    where: {
                      diameter: {
                        [Op.in]: diameter.split(','),
                      },
                    },
                  }
                : { model: WheelDiameter },
              bolt_count
                ? {
                    model: WheelBoltCount,
                    where: {
                      bolt_count: {
                        [Op.in]: bolt_count.split(','),
                      },
                    },
                  }
                : { model: WheelBoltCount },
              bolt_count_pcd
                ? {
                    model: WheelBoltCountPcd,
                    where: {
                      bolt_count_pcd: {
                        [Op.in]: bolt_count_pcd.split(','),
                      },
                    },
                  }
                : { model: WheelBoltCountPcd },
              brand
                ? {
                    model: WheelBrand,
                    where: {
                      brand: {
                        [Op.in]: brand.split(','),
                      },
                    },
                  }
                : { model: WheelBrand },
              price
                ? {
                    model: PriceWheels,
                    where: {
                      price: { [Op.between]: price.split(',') },
                    },
                  }
                : { model: PriceWheels },
              type
                ? {
                    model: WheelType,
                    where: {
                      type: {
                        [Op.in]: type.split(','),
                      },
                    },
                  }
                : { model: WheelType },
              color
                ? {
                    model: WheelColor,
                    where: {
                      color: {
                        [Op.in]: color.split(','),
                      },
                    },
                  }
                : { model: WheelColor },
              dia
                ? {
                    model: WheelDia,
                    where: {
                      dia: {
                        [Op.in]: dia.split(','),
                      },
                    },
                  }
                : { model: WheelDia },
              et
                ? {
                    model: WheelEt,
                    where: {
                      et: {
                        [Op.in]: et.split(','),
                      },
                    },
                  }
                : { model: WheelEt },
              pcd
                ? {
                    model: WheelPcd,
                    where: {
                      pcd: {
                        [Op.in]: pcd.split(','),
                      },
                    },
                  }
                : { model: WheelPcd },
              pcd2
                ? {
                    model: WheelPcd2,
                    where: {
                      pcd2: {
                        [Op.in]: pcd2.split(','),
                      },
                    },
                  }
                : { model: WheelPcd2 },
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
        await this.redisService.set(
          'wheel' +
          limit +
          offset +
          width +
          diameter +
          bolt_count +
          bolt_count_pcd +
          brand +
          price +
          type +
          color +
          dia +
          et +
          pcd +
          pcd2 +
          sort +
          'catalog',
          3600,
          JSON.stringify(wheelsAllWithCatLimitRating.rows.splice(offset, limit)),
        );
        return wheelsAllWithCatLimitRating.rows.splice(offset, limit);
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllWheelsByDiameter(diameter: string) {
    try {
      const wheelsAllByDiameter = await this.wheelRepository.findAll({
        include: [
          { model: RatingWheels },
          { model: ReviewWheels },
          { model: StockWheels },
          { model: Category },
          { model: PriceWheels },
          { model: WheelType },
          { model: WheelSizeDigits },
          { model: WheelDiameter, where: { diameter: diameter } },
        ],
      });
      return wheelsAllByDiameter;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllWheelsByBrandParams(
    width: string,
    bolt_count_pcd: string,
    dia: string,
    et: string,
    diameter: string,
    brand: string,
  ) {
    try {
      const wheelsAllByBrandParams = await this.wheelRepository.findAll({
        include: [
          { model: RatingWheels },
          { model: ReviewWheels },
          { model: StockWheels },
          { model: Category },
          { model: PriceWheels },
          { model: WheelType },
          { model: WheelSizeDigits },
          { model: WheelBrand, where: { brand: brand } },
          { model: WheelWidth, where: { width: width } },
          {
            model: WheelBoltCountPcd,
            where: { bolt_count_pcd: bolt_count_pcd },
          },
          { model: WheelDia, where: { dia: dia } },
          { model: WheelEt, where: { et: et } },
          { model: WheelDiameter, where: { diameter: diameter } },
        ],
      });
      return wheelsAllByBrandParams;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllWheelsByBrandModel(brand: string, model: string) {
    try {
      const wheelsAllByBrandModel = await this.wheelRepository.findAll({
        include: [
          { model: RatingWheels },
          { model: ReviewWheels },
          { model: StockWheels },
          { model: Category },
          { model: PriceWheels },
          { model: WheelType },
          { model: WheelSizeDigits },
          { model: WheelBrand, where: { brand: brand } },
          { model: WheelModel, where: { model: model } },
        ],
      });
      return wheelsAllByBrandModel;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllWheelsByParams(
    width: string,
    bolt_count_pcd: string,
    dia: string,
    et: string,
    diameter: string,
  ) {
    try {
      const wheelsAllByParams = await this.wheelRepository.findAll({
        include: [
          { model: RatingWheels },
          { model: ReviewWheels },
          { model: StockWheels },
          { model: Category },
          { model: PriceWheels },
          { model: WheelType },
          { model: WheelSizeDigits },
          { model: WheelWidth, where: { width: width } },
          {
            model: WheelBoltCountPcd,
            where: { bolt_count_pcd: bolt_count_pcd },
          },
          { model: WheelDia, where: { dia: dia } },
          { model: WheelEt, where: { et: et } },
          { model: WheelDiameter, where: { diameter: diameter } },
        ],
      });
      return wheelsAllByParams;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findWheelsByIdParam(id: string) {
    try {
      const wheelsIdParam = await this.wheelRepository.findByPk(id, {
        include: { all: true },
      });
      return wheelsIdParam;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async findWheelsByFullName(fullName: string) {
    try {
      const get_all_wheels = await this.wheelRepository.findAll();
      const getWheel = get_all_wheels.find((item: any) =>
        this.translitService.createStringUrl(item.full_name) == fullName
      );
      if (getWheel) {
        const grtWheelId = await this.wheelRepository.findByPk(getWheel.id, {
          include: { all: true },
        });
        if (grtWheelId) {
          return grtWheelId;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  update(id: number, updateWheelDto: UpdateWheelDto) {
    return `This action updates a #${id} wheel`;
  }

  async removeWheel(getWheelDto: GetWheelDto) {
    try {
      const wheelRemove = await this.wheelRepository.destroy({
        where: { id: getWheelDto.id },
      });

      return wheelRemove;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
