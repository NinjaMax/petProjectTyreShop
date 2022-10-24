import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { GetPropertyDto } from './dto/get-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { TyreBrand } from './entities/tyre-brand.model';

@Injectable()
export class PropertiesBrandService {
  constructor(@InjectModel(TyreBrand) private tyreBrandRepository: typeof TyreBrand,
  private tyresService: TyresService) {}

  async createTyreBrand(createPropertyDto: CreatePropertyDto) {

    try {

      const tyres = await this.tyresService.findTyresById(createPropertyDto);

      if(tyres) {

        const tyreBrand = await this.tyreBrandRepository.create(createPropertyDto);
        
        await tyreBrand.$add('tyres', [createPropertyDto.id_tyres])

        tyreBrand.tyres.push(tyres);

        return tyreBrand;

      } else {

        return new HttpException(`Data ${createPropertyDto.id_tyres} not found`, HttpStatus.NOT_FOUND);

      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllTyreBrand() {

    try {

      const tyreAllBrand = await this.tyreBrandRepository.findAll({include: {all: true}});

      return tyreAllBrand;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findBrandById(getPropertyDto: GetPropertyDto) {

    try {

      const brandId = await this.tyreBrandRepository.findByPk(getPropertyDto.id, {include: {all: true}});

      return brandId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreBrand( updatePropertyDto: UpdatePropertyDto) {

    try {

      const brandTyresId = await this.tyreBrandRepository.findByPk(updatePropertyDto.id, {include: {all: true}});
      const tyresId = await this.tyresService.findTyresById(updatePropertyDto);

      if(brandTyresId) {

        await this.tyreBrandRepository.update(
        { brand : updatePropertyDto.brand, 
          id : updatePropertyDto.id,
          tyres: brandTyresId.tyres
        }, {where: {id : updatePropertyDto.id}});

        const updateBrand = brandTyresId.tyres.find( item => item.id == updatePropertyDto.id_tyres);
       
        if(!updateBrand) {

          await brandTyresId.$add('tyres', [updatePropertyDto.id_tyres])
          brandTyresId.tyres.push(tyresId);

        }

        const updateTyreBrand = await this.tyreBrandRepository.findByPk(updatePropertyDto.id, {include: {all: true}});

        return updateTyreBrand; 

      }
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreBrand(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreBrand = await this.tyreBrandRepository.destroy({where: {id : getPropertyDto.id}});
      
      return removeTyreBrand;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
