import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from 'src/tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreBrand } from '../entities/tyres/tyre-brand.model';

@Injectable()
export class PropsBrandService {
  constructor(@InjectModel(TyreBrand) private tyreBrandRepository: typeof TyreBrand,
  private tyresService: TyresService) {}

  async createTyreBrand(createPropertyDto: CreatePropertyDto) {

    try {

      const tyreId = await this.tyresService.findTyresById(createPropertyDto);

      if(tyreId) {

        const tyreBrand = await this.tyreBrandRepository.create(createPropertyDto);
        const createTyreBrand = await this.tyreBrandRepository.findByPk(tyreBrand.id_brand, {include: {all: true}});
        await createTyreBrand.$add('tyres', [createPropertyDto.id]);
        createTyreBrand.tyres.push(tyreId);

        createTyreBrand.reload();

        return createTyreBrand;

      } else {

        const tyreBrand = await this.tyreBrandRepository.create(createPropertyDto);

        return tyreBrand;

      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreBrandFromPrice(id: number, id_brand: number, brand: string) {

    try {

      const tyreId = await this.tyresService.findTyresByIdPrice(id);
      const tyreBrand = await this.tyreBrandRepository.findOne(
      { where: { brand: brand } })

      if(tyreId && tyreBrand) {

          const updateBrand = await this.tyreBrandRepository.update({
           brand: brand}, {where: {id_brand: tyreBrand.id_brand}});
          await tyreId.$set('tyre_brand', updateBrand);
          //tyreId.country = tyreCountry;
          //updateCountry.reload();

          return updateBrand;

      } else if(tyreId && !tyreBrand) {

          const newTyreBrand = await this.tyreBrandRepository.create({id_brand, brand});

          await tyreId.$set('tyre_brand', newTyreBrand);
          //tyreId.country = tyreCountry;
          //tyreCountry.reload();

          return newTyreBrand;

      } else {

          const tyreBrand = await this.tyreBrandRepository.create({id_brand, brand});

          return tyreBrand;
      }

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);
  
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

      const brandId = await this.tyreBrandRepository.findByPk(getPropertyDto.id_brand, {include: {all: true}});

      return brandId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreBrand( updatePropertyDto: UpdatePropertyDto) {

    try {

      const brandTyresId = await this.tyreBrandRepository.findByPk(updatePropertyDto.id_brand, {include: {all: true}});
      const tyresId = await this.tyresService.findTyresById(updatePropertyDto);

      if(brandTyresId) {

        await this.tyreBrandRepository.update(
        { brand : updatePropertyDto.brand, 
          id_brand : updatePropertyDto.id_brand,
          tyres: brandTyresId.tyres
        }, {where: {id_brand : updatePropertyDto.id_brand}});

        const updateBrand = brandTyresId.tyres.find( item => item.id == updatePropertyDto.id);
       
        if(!updateBrand) {

          await brandTyresId.$add('tyres', [updatePropertyDto.id]);
          brandTyresId.tyres.push(tyresId);

        }

        const updateTyreBrand = await this.tyreBrandRepository.findByPk(updatePropertyDto.id_brand, {include: {all: true}});

        return updateTyreBrand; 

      }

      return new HttpException(`Data "id_brand" or "brand" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreBrand(getPropertyDto: GetPropertyDto) { 

    try {

      const removeTyreBrands = await this.tyreBrandRepository.destroy({where: {id : getPropertyDto.id}});
      
      return removeTyreBrands;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
