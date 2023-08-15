import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreEuromark } from '../entities/tyres/tyre-euromark.model';
import { Op } from 'sequelize';

@Injectable()
export class PropsTyreEuromarkService {
  constructor(
    @InjectModel(TyreEuromark)
    private tyreEuromarkRepository: typeof TyreEuromark,
    private tyresService: TyresService,
  ) {}

  async createTyreEuromark(createPropertyDto: CreatePropertyDto) {
    try {
      const tyreId = await this.tyresService.findTyresById(createPropertyDto);
      const tyreEuromark = await this.tyreEuromarkRepository.findOne({
        where: {
          [Op.or]: [
            { fuel_efficiency: createPropertyDto.fuel_efficiency },
            { wet_traction: createPropertyDto.wet_traction },
            { loud_level: createPropertyDto.loud_level },
        ],
        },
      });

      if (tyreId && tyreEuromark) {
        const updateEuromark = await this.tyreEuromarkRepository.update(
          {
            fuel_efficiency: createPropertyDto.fuel_efficiency,
            wet_traction: createPropertyDto.wet_traction,
            loud_level: createPropertyDto.loud_level,
          },
          { where: { id_euromark: tyreEuromark.id_euromark } },
        );
        await tyreId.$set('euromark', updateEuromark);
        //tyreId.country = tyreCountry;
        //updateCountry.reload();

        return updateEuromark;
      } else if (tyreId && !tyreEuromark) {
        const newTyreEuromark = await this.tyreEuromarkRepository.create(
          createPropertyDto,
        );

        await tyreId.$set('euromark', newTyreEuromark);
        //tyreId.country = tyreCountry;
        //tyreCountry.reload();

        return newTyreEuromark;
      } else {
        const tyreEuromark = await this.tyreEuromarkRepository.create(
          createPropertyDto,
        );

        return tyreEuromark;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createTyreEuromarkFromPrice(
    id: number,
    fuel_efficiency: string,
    wet_traction: string,
    loud_level: number
  ) {
    try {
      const [tyreEuromark, created] =
        await this.tyreEuromarkRepository.findOrCreate({
          where: {
            [Op.or]: [
              { fuel_efficiency: fuel_efficiency },
              { wet_traction: wet_traction },
              { loud_level: loud_level },
            ],
          },
          defaults: {
            fuel_efficiency: fuel_efficiency,
            wet_traction: wet_traction,
            loud_level: loud_level,
          },
        });

      if (created || !created) {
        await tyreEuromark.$add('tyres', id);
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyreEuromark() {
    try {
      const tyreAllEuromark = await this.tyreEuromarkRepository.findAll();
      return tyreAllEuromark;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findTyreEuromarkById(getPropertyDto: GetPropertyDto) {
    try {
      const speedIndexId = await this.tyreEuromarkRepository.findByPk(
        getPropertyDto.id_euromark,
        { include: { all: true } },
      );

      return speedIndexId;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateTyreEuromark(updatePropertyDto: UpdatePropertyDto) {
    try {
      const speedEuromark = await this.tyreEuromarkRepository.findByPk(
        updatePropertyDto.id_euromark,
        { include: { all: true } },
      );

      if (speedEuromark) {
        const updateEuromark = await this.tyreEuromarkRepository.update(
          {
            fuel_efficiency: updatePropertyDto.fuel_efficiency,
            wet_traction: updatePropertyDto.wet_traction,
            loud_level: updatePropertyDto.loud_level,
          },
          { where: { id_euromark: updatePropertyDto.id_euromark } },
        );

        return updateEuromark;
      }

      return new HttpException(
        `Data "id_country" or "country" is incorrect or Not Found`,
        HttpStatus.NOT_FOUND,
      );
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeTyreEuromark(getPropertyDto: GetPropertyDto) {
    try {
      const removeTyreEuromark = await this.tyreEuromarkRepository.destroy({
        where: { id_euromark: getPropertyDto.id_euromark },
      });
      return removeTyreEuromark;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
