import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelModel } from '../entities/wheels/wheel-model.model';
import { Wheel } from '../../wheels/entities/wheel.model';
//import { Op } from 'sequelize';
import { StringTransformServiceProp } from '../stringTransform';
import { WheelBrand } from '../entities/wheels/wheel-brand.model';
import { WheelWidth } from '../entities/wheels/wheel-width.model';
import { WheelBoltCountPcd } from '../entities/wheels/wheel-boltCountPcd.model';
import { WheelDia } from '../entities/wheels/wheel-dia.model';
import { WheelEt } from '../entities/wheels/wheel-et.model';
import { WheelDiameter } from '../entities/wheels/wheel-diameter.model';
import { Question } from '../../questions/entities/question.entity';
import { PriceWheels } from '../../prices/entities/price-wheels.model';
import { ReviewWheels } from '../../reviews/entities/review-wheels.model';

@Injectable()
export class PropsWheelModelService {
  constructor(
    @InjectModel(WheelModel) private wheelModelRepository: typeof WheelModel,
    private wheelsService: WheelsService,
    private stringService: StringTransformServiceProp,
  ) {}

  async createWheelModel(createPropertyDto: CreatePropertyDto) {
    try {
      const wheelId = await this.wheelsService.findWheelById(createPropertyDto);

      if (wheelId) {
        const wheelModel = await this.wheelModelRepository.create(
          createPropertyDto,
        );
        const createWheelModel = await this.wheelModelRepository.findByPk(
          wheelModel.id_model,
          { include: { all: true } },
        );
        await createWheelModel.$add('wheels', [createPropertyDto.id]);
        createWheelModel.wheels.push(wheelId);
        createWheelModel.reload();
        return createWheelModel;
      } else {
        const newWheelModel = await this.wheelModelRepository.create(
          createPropertyDto,
        );

        return newWheelModel;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createWheelModelFromPrice(id: number, id_model: number, model: string) {
    try {
      const [wheelModel, created] =
        await this.wheelModelRepository.findOrCreate({
          where: { id_model: id_model },
          defaults: { id_model: id_model, model: model },
        });

      if (created || !created) {
        await wheelModel.$add('wheels', id);
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllWheelModel() {
    try {
      const wheelAllModel = await this.wheelModelRepository.findAll({
        include: { all: true },
      });

      return wheelAllModel;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findWheelModelById(getPropertyDto: GetPropertyDto) {
    try {
      const modelId = await this.wheelModelRepository.findByPk(
        getPropertyDto.id_model,
        { include: { all: true } },
      );

      return modelId;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllWheelsModelByBrand(brand: number) {
    try {
      const wheelsAllModelsByBrand = await this.wheelModelRepository.findAll({
        include: [{ model: Wheel, where: { id_brand: brand } }],
      });
      return wheelsAllModelsByBrand;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,)
    }
  };

  async findAllWheelsModelByModelName(brand_and_model: string) {
    try {
      const getBrandModel = brand_and_model.split('-')
      const getAllModel = await this.wheelModelRepository.findAll();
      const getWheelByModel = getAllModel.find(
        (item: any) =>
          this.stringService.createStringUrl(item.model) ===
            brand_and_model
              .split('-')
              .slice(1, getBrandModel.length)
              .join('-') ||
          this.stringService.createStringUrl(item.model) ===
            brand_and_model.split('-').slice(2, getBrandModel.length).join('-'),
      );
      console.log('GET_WHEEL: ', getWheelByModel);
      if (getWheelByModel) {
        const wheelsAllByModels = await this.wheelModelRepository.findOne({
          where: {
            id_model: getWheelByModel.id_model
          },
          include: [
            {
              model: Wheel,
              include: [
                { model: WheelBrand }, 
                { model: WheelModel },
                { model: WheelWidth},
                { model: WheelBoltCountPcd},
                { model: WheelDia},
                { model: WheelEt},
                { model: WheelDiameter},
                { model: ReviewWheels },
                { model: Question },
                { model: PriceWheels }
              ],
            },
          ],
        });
        return wheelsAllByModels;
      } else {
        return null;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,)
    }
  };

  async updateWheelModel(updatePropertyDto: UpdatePropertyDto) {
    try {
      const modelWheelId = await this.wheelModelRepository.findByPk(
        updatePropertyDto.id_model,
        { include: { all: true } },
      );

      if (modelWheelId) {
        const updateModel = await this.wheelModelRepository.update(
          { model: updatePropertyDto.model },
          { where: { id_model: updatePropertyDto.id_model } },
        );

        return updateModel;
      }

      return new HttpException(
        `Data "id_model" or "model" is incorrect or Not Found`,
        HttpStatus.NOT_FOUND,
      );
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeWheelModel(getPropertyDto: GetPropertyDto) {
    try {
      const removeWheelModels = await this.wheelModelRepository.destroy({
        where: { id_model: getPropertyDto.id_model },
      });

      return removeWheelModels;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
