import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreParams } from '../entities/tyres/tyre-params.model';

@Injectable()
export class PropsTyreParamsService {
  constructor(@InjectModel(TyreParams) private tyreParamsRepository: typeof TyreParams,
  private tyresService: TyresService) {}

  async createTyreParams(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreParams = await this.tyreParamsRepository.findOne(
        {where: {params: createPropertyDto.params} })

        if(tyreId && tyreParams) {

            const updateParams = await this.tyreParamsRepository.update({
             params: createPropertyDto.params}, {where: {id_params: tyreParams.id_params}});
            await tyreId.$set('params', updateParams);

            return updateParams;

        } else if(tyreId && !tyreParams) {

            const newTyreParams = await this.tyreParamsRepository.create(createPropertyDto);

            await tyreId.$set('params', newTyreParams);

            return newTyreParams;

        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createParamsFromPrice(id: number, params: string) {

    try {

      const [tyreParams, created] = await this.tyreParamsRepository.findOrCreate(
        {where: {params: params}, defaults: {params: params}}
      );

      if(created || !created) {

        await tyreParams.$add('tyres', id);
        //tyreParams.tyres.push(id);
          
      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreParams() {

    try {

      const tyreAllLoadIndex = await this.tyreParamsRepository.findAll({include: {all: true}});

      return tyreAllLoadIndex;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreParamsById(getPropertyDto: GetPropertyDto) {

    try {

      const paramsId = await this.tyreParamsRepository.findByPk(getPropertyDto.id_params, {include: {all: true}});

      return paramsId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreParams( updatePropertyDto: UpdatePropertyDto) {

    try {

      const paramsTyresId = await this.tyreParamsRepository.findByPk(updatePropertyDto.id_params, {include: {all: true}});

      if(paramsTyresId) {

        const updateParams = await this.tyreParamsRepository.update(
        { params: updatePropertyDto.params}, {where: {id_params: updatePropertyDto.id_params}});

        return updateParams; 

      }

      return new HttpException(`Data "id_load_index" or "load_index" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreParams(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreParamse = await this.tyreParamsRepository.destroy({where: {id_params: getPropertyDto.id_params}});
      
      return removeTyreParamse;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}