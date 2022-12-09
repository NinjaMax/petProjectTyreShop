import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOilDto } from './dto/create-oil.dto';
import { GetOilDto } from './dto/get-oil.dto';
import { UpdateOilDto } from './dto/update-oil.dto';
import { Oil } from './entities/oil.model';

@Injectable()
export class OilsService {

  constructor(@InjectModel(Oil) private oilRepository: typeof Oil,
  ) {}

  async createOil(createOilDto: CreateOilDto) {

    try {
      
      const oil = await this.oilRepository.create(createOilDto);

      return oil;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllOils() {
    
    try {
      
      const oilAll = await this.oilRepository.findAll({include: {all: true}});

      return oilAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findOilById(getOilDto: GetOilDto) {

    try {
      
      const oilById = await this.oilRepository.findByPk(getOilDto.id, {include: {all: true}});

      return oilById;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateOilDto: UpdateOilDto) {
    return `This action updates a #${id} oil`;
  }

  async removeOil(getOilDto: GetOilDto) {

    try {
      
      const oilRemove = await this.oilRepository.destroy({where: {id: getOilDto.id}});

      return oilRemove;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}
