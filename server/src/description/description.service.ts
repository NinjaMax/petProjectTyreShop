import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { Description } from './entities/description.entity';
import { TyresService } from '../tyres/tyres.service';
import { WheelsService } from '../wheels/wheels.service';
import { OilsService } from '../oils/oils.service';
import { BatteriesService } from '../batteries/batteries.service';
import { PropsBrandService } from '../properties/props-tyres-services/props-tyre-brand.service';
import { PropsModelService } from '../properties/props-tyres-services/props-tyre-model.service';
import { PropsTyreHomologationService } from '../properties/props-tyres-services/props-tyre-homologation.service';
import { PropsTyreVehicleTypeService } from '../properties/props-tyres-services/props-tyre-vehicleType.service';
import { CategorysService } from '../categorys/categorys.service';
import { PropsWheelBrandService } from '../properties/props-wheel-services/props-wheel-brand.service';
import { PropsWheelModelService } from '../properties/props-wheel-services/props-wheel-model.service';
import { PropsWheelTypeService } from '../properties/props-wheel-services/props-wheel-type.service';
import { GetDescriptionDto } from './dto/get-description.dto';

@Injectable()
export class DescriptionService {
  constructor(@InjectModel(Description) private descriptionRepository: typeof Description,
    private tyresService: TyresService,
    private wheelsService: WheelsService,
    private oilsService: OilsService,
    private batteriesService: BatteriesService,
    private tyreBrandService: PropsBrandService,
    private tyreModelService: PropsModelService,
    private tyreHomologationService: PropsTyreHomologationService,
    private tyreVehicleService: PropsTyreVehicleTypeService,
    private categoryService: CategorysService,
    private wheelsBrandService: PropsWheelBrandService,
    private wheelsModelService: PropsWheelModelService,
    private wheelsTypeService: PropsWheelTypeService,
  ) {}
  async createDescription(createDescriptionDto: CreateDescriptionDto) {
    try {
      const findIdtyre = await this.tyresService.findTyresById(
        createDescriptionDto,
      );
      const findIdWheel = await this.wheelsService.findWheelById(
        createDescriptionDto,
      );
      const findIdOils = await this.oilsService.findOilById(
        createDescriptionDto,
      );
      const findIdBattery = await this.batteriesService.findBatteryById(
        createDescriptionDto,
      );
      const findIdTyreBrand = await this.tyreBrandService.findBrandById(
        createDescriptionDto,
      );
      const findIdTyreModel = await this.tyreModelService.findModelById(
        createDescriptionDto,
      );
      const findIdTyreHomologation =
        await this.tyreHomologationService.findTyreHomologationById(
          createDescriptionDto,
        );
      const findIdVehicleType = await this.tyreVehicleService.findTyreVehicleTypeById(
          createDescriptionDto,
      );
      const findIdCategory = await this.categoryService.findCatById(
        createDescriptionDto,
      );
      const findIdWheelBrand = await this.wheelsBrandService.findWheelBrandById(
        createDescriptionDto,
      );
      const findIdWheelModel = await this.wheelsModelService.findWheelModelById(
        createDescriptionDto,
      );
      const findIdWheelType = await this.wheelsTypeService.findWheelTypeById(
        createDescriptionDto,
      );

      if (findIdtyre) {
        const createTyreDescription = await this.descriptionRepository.create(
          createDescriptionDto,
        );
        findIdtyre.$add('description', createTyreDescription.id_description);
        return createTyreDescription;
      }
      if (findIdWheel) {
        const createWheelDescription = await this.descriptionRepository.create(
          createDescriptionDto,
        );
        findIdWheel.$add('description', createWheelDescription.id_description);
        return createWheelDescription;
      }
      if (findIdOils) {
        const createOilDescription = await this.descriptionRepository.create(
          createDescriptionDto,
        );
        findIdOils.$add('description', createOilDescription.id_description);
        return createOilDescription;
      }
      if (findIdBattery) {
        const createBatteryDescription =
          await this.descriptionRepository.create(createDescriptionDto);
        findIdBattery.$add(
          'description',
          createBatteryDescription.id_description,
        );
        return createBatteryDescription;
      }
      if (findIdTyreBrand) {
        const createTyreBrandDescription =
          await this.descriptionRepository.create(createDescriptionDto);
        findIdTyreBrand.$add(
          'description',
          createTyreBrandDescription.id_description,
        );
        return createTyreBrandDescription;
      }
      if (findIdTyreModel) {
        const createTyreModelDescription =
          await this.descriptionRepository.create(createDescriptionDto);
        findIdTyreModel.$add(
          'description',
          createTyreModelDescription.id_description,
        );
        return createTyreModelDescription;
      }
      if (findIdTyreHomologation) {
        const createTyreHomologationDescription =
          await this.descriptionRepository.create(createDescriptionDto);
        findIdTyreHomologation.$add(
          'description',
          createTyreHomologationDescription.id_description,
        );
        return createTyreHomologationDescription;
      }
      if (findIdVehicleType) {
        const createTyreTypeDescription =
          await this.descriptionRepository.create(createDescriptionDto);
        findIdVehicleType.$add(
          'description',
          createTyreTypeDescription.id_description,
        );
        return createTyreTypeDescription;
      }
      if (findIdCategory) {
        const createCategoryDescription =
          await this.descriptionRepository.create(createDescriptionDto);
        findIdCategory.$add(
          'description',
          createCategoryDescription.id_description,
        );
        return createCategoryDescription;
      }
      if (findIdWheelBrand) {
        const createWheelBrandDescription =
          await this.descriptionRepository.create(createDescriptionDto);
        findIdWheelBrand.$add(
          'description',
          createWheelBrandDescription.id_description,
        );
        return createWheelBrandDescription;
      }
      if (findIdWheelModel) {
        const createWheelModelDescription =
          await this.descriptionRepository.create(createDescriptionDto);
        findIdWheelModel.$add(
          'description',
          createWheelModelDescription.id_description,
        );
        return createWheelModelDescription;
      }
      if (findIdWheelType) {
        const createWheelTypeDescription =
          await this.descriptionRepository.create(createDescriptionDto);
        findIdWheelType.$add(
          'description',
          createWheelTypeDescription.id_description,
        );
        return createWheelTypeDescription;
      }
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
    return 'This action adds a new description';
  }

  async findAllDescription() {
    try {
      const descriptionAll = await this.descriptionRepository.findAll({
        include: { all: true },
      });

      return descriptionAll;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findDescriptionById(id_description: number) {
    try {
      const findDiscriptionById = await this.descriptionRepository.findByPk(
        id_description,
        { include: { all: true } },
      );
      return findDiscriptionById;
   } catch (error) {
    throw new HttpException(
      'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
    );
   }
  }

  async updateDescription(updateDescriptionDto: UpdateDescriptionDto) {
    try {
      const findDiscriptionUpdate = await this.descriptionRepository.findByPk(
        updateDescriptionDto.id_description,
        { include: { all: true } },
      );
      if (findDiscriptionUpdate) {
        await this.descriptionRepository.update({
          description: updateDescriptionDto.description,
          },
          {
            where: {
              id_description: updateDescriptionDto.id_description,
            },
          },
        );
      }
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
          HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeDescription(createDescriptionDto: CreateDescriptionDto) {
    try {
      const removeDescription = await this.descriptionRepository.destroy(
        {where: {
          id_description: createDescriptionDto.id_description,
        },
      });
      return removeDescription;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
          HttpStatus.NOT_FOUND,
      );
    }
  }
}
