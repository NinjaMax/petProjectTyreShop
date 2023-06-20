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

  async findAllTyresWithOffset(
    offset: number,
    limit: number,
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
      const tyresAllLimit = await this.tyresRepository.findAll({
        offset: offset ?? 0,
        limit: limit,
        include: [
          { all: true },
          width ? {
            model: TyreWidth,
            where: {
              width:{[Op.in]: width.split(','),}
            }
          }
           : {model: TyreWidth},
          height ? {
            model: TyreHeight,
            where: {
              height:{[Op.in]: height.split(','),}
            }
          }
           : {model: TyreHeight},
           diameter ? {
            model: TyreDiameter,
            where: {
              diameter:{[Op.in]: diameter.split(','),}
            }
          }
           : {model: TyreDiameter},
           season ? {
            model: TyreSeason,
            where: {
              season_ua: {[Op.in]: season.split(','),
              },
            }
          }
          : { model: TyreSeason },
          brand ? {
            model: TyreBrand,
            where: {
              brand:{[Op.in]: brand.split(','),}
            }
          }
           : {model: TyreBrand},
           price ? {
            model: PriceTyres,
            where: {
              price:{[Op.between]: price.split(','),}
            }
          }
           : {model: PriceTyres}, 
           type ?
           { model: TyreVehicleType, 
             where: { 
               vehicle_type_ua: {[Op.in]: type.split(','),}, 
             }
           } : 
           { model: TyreVehicleType },
           speed_index ? {
            model: TyreSpeedIndex,
            where: {
              speed_index_with_desc:{[Op.in]: speed_index.split(','),}
            }
          }
           : {model: TyreSpeedIndex},
           load_index ? {
            model: TyreLoadIndex,
            where: {
              load_index_with_desc:{[Op.in]: load_index.split(','),}
            }
          }
           : {model: TyreLoadIndex},
           studded ? {
            model: TyreStudded,
            where: {
              studded:{[Op.in]: studded.split(','),}
            }
          }
           : {model: TyreStudded},
           run_flat ? {
            model: TyreRunFlat,
            where: {
              run_flat:{[Op.in]: run_flat.split(',')}
            }
          }
           : {model: TyreRunFlat},
           homologation ? {
            model: TyreHomologation,
            where: {
              homologation:{[Op.in]: homologation.split(',')}
            }
          }
           : {model: TyreHomologation},
           reinforce ? {
            model: TyreReinforce,
            where: {
              reinforce:{[Op.in]: reinforce.split(',')}
            }
          }
          : {model: TyreReinforce}
        ], 
        order: [['stock', 'stock', 'DESC']],
      });
      return tyresAllLimit;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,)
    }
  }

  async findAllTyresWithoutOffset(
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
      const tyresAllWithoutLimit = await this.tyresRepository.findAll({
        // offset: offset ?? 0,
        // limit: limit,
        include: [
          // { all: true },
          width ? {
            model: TyreWidth,
            where: {
              width:{
                [Op.in]: width.split(','),
            }
            }
          }
           : {model: TyreWidth},
          height ? {
            model: TyreHeight,
            where: {
              height:{
                [Op.in]: height.split(','),
              }
            }
          }
           : {model: TyreHeight},
          diameter ? {
            model: TyreDiameter,
            where: {
              diameter:{
                [Op.in]: diameter.split(','),
              }
            }
          }
           : {model: TyreDiameter},
          season ? {
            model: TyreSeason,
            where: {
              season_ua: {
                [Op.in]: season.split(','),
              },
            }
          }
          : { model: TyreSeason },
          brand ? {
            model: TyreBrand,
            where: {
              brand:{
                [Op.in]: brand.split(','),
              }
            }
          }
           : {model: TyreBrand},
          price ? {
            model: PriceTyres,
            where: {
              price:{[Op.between]: price.split(','),}
            }
          }
           : {model: PriceTyres}, 
          type ?
           { model: TyreVehicleType, 
             where: { 
               vehicle_type_ua: {
                [Op.in]: type.split(','),
              }, 
             }
           } : 
           { model: TyreVehicleType },
          speed_index ? {
            model: TyreSpeedIndex,
            where: {
              speed_index_with_desc:{
                [Op.in]: speed_index.split(','),
              }
            }
          }
           : {model: TyreSpeedIndex},
          load_index ? {
            model: TyreLoadIndex,
            where: {
              load_index_with_desc:{
                [Op.in]: load_index.split(','),
              }
            }
          }
           : {model: TyreLoadIndex},
          studded ? {
            model: TyreStudded,
            where: {
              studded:{
                [Op.in]: studded.split(','),
              }
            }
          }
           : {model: TyreStudded},
          run_flat ? {
            model: TyreRunFlat,
            where: {
              run_flat:{
                [Op.in]: run_flat.split(','),
              }
            }
          }
           : {model: TyreRunFlat},
          homologation ? {
            model: TyreHomologation,
            where: {
              homologation:{
                [Op.in]: homologation.split(','),
              }
            }
          }
           : {model: TyreHomologation},
          reinforce ? {
            model: TyreReinforce,
            where: {
              reinforce:{
                [Op.in]: reinforce.split(','),
              }
            }
          }
          : {model: TyreReinforce}
        ], 
        // order: [['stock', 'stock', 'DESC']],
      });
      return tyresAllWithoutLimit;
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
          { model: TyreSeason, where: { season_ua: season } },
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
          { model: TyreVehicleType, where: { vehicle_type_ua: type } },
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

  async findTyresByIdParam(id: string) {
    try {
      const tyresIdParam = await this.tyresRepository.findByPk(id, {
        include: { all: true }
      });
      return tyresIdParam;
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

  async findAndCountAllTyres() {
    try {
      const tyresCountAll = await this.tyresRepository.findAndCountAll();

      return tyresCountAll;
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
