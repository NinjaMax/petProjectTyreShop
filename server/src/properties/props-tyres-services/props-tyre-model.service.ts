import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreModel } from '../entities/tyres/tyre-model.model';
import { TyresService } from '../../tyres/tyres.service';

@Injectable()
export class PropsModelService {
  constructor(
    @InjectModel(TyreModel) private tyreModelRepository: typeof TyreModel,
    private tyresService: TyresService,
  ) {}

  async createTyreModel(createPropertyDto: CreatePropertyDto) {
    try {
      const tyreId = await this.tyresService.findTyresById(createPropertyDto);

      if (tyreId) {
        const tyreModel = await this.tyreModelRepository.create(
          createPropertyDto,
        );
        const createTyreModel = await this.tyreModelRepository.findByPk(
          tyreModel.id_model,
          { include: { all: true } },
        );
        await createTyreModel.$add('tyres', [createPropertyDto.id]);

        createTyreModel.tyres.push(tyreId);

        createTyreModel.reload();

        return createTyreModel;
      } else {
        const newTyreModel = await this.tyreModelRepository.create(
          createPropertyDto,
        );

        return newTyreModel;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createTyreModelFromPrice(id: number, id_model: number, model: string) {
    try {
      const [tyreModel, created] = await this.tyreModelRepository.findOrCreate({
        where: { id_model: id_model },
        defaults: { id_model: id_model, model: model },
      });

      if (created || !created) {
        await tyreModel.$add('tyres', id);
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyreModel() {
    try {
      const tyreAllModel = await this.tyreModelRepository.findAll();
      return tyreAllModel;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findModelById(getPropertyDto: GetPropertyDto) {
    try {
      const modelId = await this.tyreModelRepository.findByPk(
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

  async updateTyreModel(updatePropertyDto: UpdatePropertyDto) {
    try {
      const modelTyresId = await this.tyreModelRepository.findByPk(
        updatePropertyDto.id_model,
        { include: { all: true } },
      );
      const tyresId = await this.tyresService.findTyresById(updatePropertyDto);

      if (modelTyresId) {
        await this.tyreModelRepository.update(
          {
            model: updatePropertyDto.model,
            id_model: updatePropertyDto.id_model,
            tyres: modelTyresId.tyres,
          },
          { where: { id_model: updatePropertyDto.id_model } },
        );

        const updateBrand = modelTyresId.tyres.find(
          (item) => item.id == updatePropertyDto.id,
        );

        if (!updateBrand) {
          await modelTyresId.$add('tyres', [updatePropertyDto.id]);
          modelTyresId.tyres.push(tyresId);
        }

        const updateTyreModel = await this.tyreModelRepository.findByPk(
          updatePropertyDto.id_model,
          { include: { all: true } },
        );

        return updateTyreModel;
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

  async removeTyreModel(getPropertyDto: GetPropertyDto) {
    try {
      const removeTyreModels = await this.tyreModelRepository.destroy({
        where: { id: getPropertyDto.id },
      });

      return removeTyreModels;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
