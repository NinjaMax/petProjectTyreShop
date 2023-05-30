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

@Injectable()
export class TyresService {
  constructor(@InjectModel(Tyres) private tyresRepository: typeof Tyres,
  ) {}

  async createTyres(createTyreDto: CreateTyreDto) {
    try {
      const tyres = await this.tyresRepository.create(createTyreDto);
      return tyres;

    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq', 
        HttpStatus.NOT_FOUND
      );
    }
  }

  async createTyresFromPrice(
    id: number, 
    full_name: string,
    photo_url: string, 
    update_date: Date, 
  ) {
    try {
      const [tyresIdFromPrice, created] = 
      await this.tyresRepository.findOrCreate({
        where: { id: id }, 
          defaults: {
            id: id,
            full_name: full_name, 
            photo_url: photo_url,
            update_date: update_date,
          }
        });
      if (!created) {
        await tyresIdFromPrice.update(
          {
          //full_name: full_name, 
          //photo_url: photo_url,
          update_date: update_date},
          {where: {id: tyresIdFromPrice.id}}
        );
        return tyresIdFromPrice;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq', 
        HttpStatus.NOT_FOUND
      );
    }
  }

  async findAllTyres() {
    try {
      const tyresAll = await this.tyresRepository.findAll({
        include: { all: true }
      });
      return tyresAll;

    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,)
    }
  }

  async findAllTyresWithOffset(offset: number) {
    try {
      const tyresAllLimit = await this.tyresRepository.findAll({
        offset: offset ?? 0,
        limit: 9,
        include: { all: true },
      });
      return tyresAllLimit;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,)
    }
  }

  async findAllTyresBySeason(season: string) {
    try {
      const tyresAllByseason = await this.tyresRepository.findAll({
        include: [
          { all: true },
          { model: TyreSeason, where: { season: season } },
        ],
      });
      return tyresAllByseason;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,)
    }
  }

  async findAllTyresByType(type: string) {
    try {
      const tyresAllByType = await this.tyresRepository.findAll({
        include: [
          { all: true },
          { model: TyreVehicleType, where: { vehicle_type: type } },
        ],
      });
      return tyresAllByType;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,)
    }
  }

  async findAllTyresByDiameter(diameter: string) {
    try {
      const tyresAllByDiameter = await this.tyresRepository.findAll({
        include: [
          { all: true },
          { model: TyreDiameter, where: { diameter: diameter } },
        ],
      });
      return tyresAllByDiameter;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,)
    }
  }

  async findAllTyresByParams(params: string) {
    try {
      const tyresAllByParams = await this.tyresRepository.findAll({
        include: [
          { all: true },
          { model: TyreParams, where: { params: params } },
        ],
      });
      return tyresAllByParams;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,)
    }
  }

  async findTyresById(getTyreDto: GetTyreDto) {
    try {
      const tyresId = await this.tyresRepository.findByPk(getTyreDto.id, {
        include: { all: true }
      });

      return tyresId;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found', 
        HttpStatus.NOT_FOUND
      );
    }
  }

  async findTyresByIdPrice(id: number) {
    try {
      const tyresId = await this.tyresRepository.findByPk(id, {
        include: { all: true }
      });

      return tyresId;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found', 
        HttpStatus.NOT_FOUND
      );
    }
  }

  async updateTyres(updateTyreDto: UpdateTyreDto) {
    try {
      const tyresId = await this.tyresRepository.findByPk(updateTyreDto.id, { 
        include: { all: true }
      });
      if (tyresId) {
        await this.tyresRepository.update(
        {  
          full_name : updateTyreDto.full_name,
          photo_url: updateTyreDto.photo_url,
          //update_date : updateTyreDto.update_date
        }, {where: {id : updateTyreDto.id}});

        tyresId.save();
        //const updateTyres = await this.tyresRepository.findByPk(updateTyreDto.id, {include: {all: true}});

        return tyresId; 
      }
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found', 
        HttpStatus.NOT_FOUND
      );
    }
  }

  async remove(getTyreDto: GetTyreDto) { 
    try {
      const removeTyres = await this.tyresRepository.destroy({
        where: { id: getTyreDto.id }
      });
      return removeTyres;

    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found', 
        HttpStatus.NOT_FOUND
      );
    }
  }
}
