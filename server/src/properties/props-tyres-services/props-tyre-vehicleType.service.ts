import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreVehicleType } from '../entities/tyres/tyre-vehicleType.model';

@Injectable()
export class PropsTyreVehicleTypeService {
  constructor(
    @InjectModel(TyreVehicleType)
    private tyreVehicleTypeRepository: typeof TyreVehicleType,
    private tyresService: TyresService,
  ) {}

  async createTyreVehicleType(createPropertyDto: CreatePropertyDto) {
    try {
      const tyreId = await this.tyresService.findTyresById(createPropertyDto);
      const tyreVehicleType = await this.tyreVehicleTypeRepository.findOne({
        where: { vehicle_type: createPropertyDto.vehicle_type },
      });

      if (tyreId && tyreVehicleType) {
        const updateVehicleType = await this.tyreVehicleTypeRepository.update(
          {
            vehicle_type: createPropertyDto.vehicle_type,
            vehicle_type_ua: createPropertyDto.vehicle_type_ua,
          },
          { where: { id_vehicle_type: tyreVehicleType.id_vehicle_type } },
        );
        await tyreId.$set('vehicle_type', updateVehicleType);

        return updateVehicleType;
      } else {
        const newTyreVehicleType = await this.tyreVehicleTypeRepository.create(
          createPropertyDto,
        );

        await tyreId.$set('vehicle_type', newTyreVehicleType.id_vehicle_type);

        return newTyreVehicleType;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createTyreVehicleTypeFromPrice(
    id: number,
    id_vehicle_type: number,
    vehicle_type: string,
    vehicle_type_ua: string,
  ) {
    try {
      const [tyreVehicleType, created] =
        await this.tyreVehicleTypeRepository.findOrCreate({
          where: { vehicle_type: vehicle_type },
          defaults: {
            id_vehicle_type: id_vehicle_type,
            vehicle_type: vehicle_type,
            vehicle_type_ua: vehicle_type_ua,
          },
        });

      if (created || !created) {
        await tyreVehicleType.$add('tyres', id);
      }
    } catch (error){
      console.log('ERROR: ', error, 'ID: ', id, 'TYPE: ', vehicle_type_ua);
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyreVehicleType() {
    try {
      const tyreAllVehicleType = await this.tyreVehicleTypeRepository.findAll();
      return tyreAllVehicleType;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findTyreVehicleTypeById(getPropertyDto: GetPropertyDto) {
    try {
      const vehicleTypeId = await this.tyreVehicleTypeRepository.findByPk(
        getPropertyDto.id_vehicle_type,
        { include: { all: true } },
      );

      return vehicleTypeId;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateTyreVehicleType(updatePropertyDto: UpdatePropertyDto) {
    try {
      const vehicleTypeTyresId = await this.tyreVehicleTypeRepository.findByPk(
        updatePropertyDto.id_vehicle_type,
        { include: { all: true } },
      );

      if (vehicleTypeTyresId) {
        const updateVehicleType = await this.tyreVehicleTypeRepository.update(
          {
            vehicle_type: updatePropertyDto.vehicle_type,
            vehicle_type_ua: updatePropertyDto.vehicle_type_ua,
          },
          { where: { id_vehicle_type: updatePropertyDto.id_vehicle_type } },
        );

        return updateVehicleType;
      }

      return new HttpException(
        `Data "id_vehicle_type" or "vehicle_type" is incorrect or Not Found`,
        HttpStatus.NOT_FOUND,
      );
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeTyreVehicleType(getPropertyDto: GetPropertyDto) {
    try {
      const removeTyreVehicleTypes =
        await this.tyreVehicleTypeRepository.destroy({
          where: { id_vehicle_type: getPropertyDto.id_vehicle_type },
        });

      return removeTyreVehicleTypes;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
