import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WheelsService } from 'src/wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelBrand } from '../entities/wheels/wheel-brand.model';

@Injectable()
export class PropsWheelBrandService {
  constructor(@InjectModel(WheelBrand) private wheelBrandRepository: typeof WheelBrand,
  private wheelsService: WheelsService) {}

  async createWheelBrand(createPropertyDto: CreatePropertyDto) {

    try {
    
        const wheelId = await this.wheelsService.findWheelById(createPropertyDto);
        const wheelBrand = await this.wheelBrandRepository.findOne(
        { where: { brand: createPropertyDto.brand } })

        if(wheelId && wheelBrand) {

            const updateBrand = await this.wheelBrandRepository.update({
             brand: createPropertyDto.brand}, {where: {id_brand: wheelBrand.id_brand}});
            await wheelId.$set('brand', updateBrand);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateBrand;

        } else if(wheelId && !wheelBrand) {

            const newWheelBrand = await this.wheelBrandRepository.create(createPropertyDto);

            await wheelId.$set('brand', newWheelBrand);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newWheelBrand;

        } else {

            const wheelBrand = await this.wheelBrandRepository.create(createPropertyDto);

            return wheelBrand;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createWheelBrandFromPrice(id: number, brand: string) {

    try {

      const [wheelBrand, created] = await this.wheelBrandRepository.findOrCreate(
        {where: {brand: brand}, 
          defaults: {brand: brand}
        }
      );

      if(created || !created) {

        wheelBrand.$add('wheels', id);

      }


    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllWheelBrand() {

    try {

      const wheelAllBrand = await this.wheelBrandRepository.findAll({include: {all: true}});

      return wheelAllBrand;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findWheelBrandById(getPropertyDto: GetPropertyDto) {
    try {
      const brandId = await this.wheelBrandRepository.findByPk(getPropertyDto.id_brand, {include: {all: true}});

      return brandId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateWheelBrand( updatePropertyDto: UpdatePropertyDto) {

    try {

      const brandWheelId = await this.wheelBrandRepository.findByPk(updatePropertyDto.id_brand, {include: {all: true}});

      if(brandWheelId) {

        const updateBrand = await this.wheelBrandRepository.update(
        { brand: updatePropertyDto.brand}, {where: {id_brand: updatePropertyDto.id_brand}});

        return updateBrand; 

      }

      return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeWheelBrand(getPropertyDto: GetPropertyDto) { 

    try {

      const removeWheelBrands = await this.wheelBrandRepository.destroy({where: {id_brand: getPropertyDto.id_brand}});
      
      return removeWheelBrands;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}