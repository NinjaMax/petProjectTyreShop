import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreDemo } from '../entities/tyres/tyre-demo.model';

@Injectable()
export class PropsTyreDemoService {
  constructor(@InjectModel(TyreDemo) private tyreDemoRepository: typeof TyreDemo,
  private tyresService: TyresService) {}

  async createTyreDemo(createPropertyDto: CreatePropertyDto) {

    try {
    
        const tyreId = await this.tyresService.findTyresById(createPropertyDto);
        const tyreDemo = await this.tyreDemoRepository.findOne(
        { where: { demo: createPropertyDto.demo } })

        if(tyreId && tyreDemo) {

            const updateDemo = await this.tyreDemoRepository.update({
             demo: createPropertyDto.demo
            }, {where: {id_demo: tyreDemo.id_demo}});
            await tyreId.$set('demo', updateDemo);
            //tyreId.country = tyreCountry;
            //updateCountry.reload();

            return updateDemo;

        } else if(tyreId && !tyreDemo) {

            const newTyreDemo = await this.tyreDemoRepository.create(createPropertyDto);

            await tyreId.$set('demo', newTyreDemo);
            //tyreId.country = tyreCountry;
            //tyreCountry.reload();

            return newTyreDemo;

        } else {

            const tyreDemo = await this.tyreDemoRepository.create(createPropertyDto);

            return tyreDemo;
        }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async createTyreDemoFromPrice( id: number, demo: string) {

    try {

      const [tyreDemo, created] = await this.tyreDemoRepository.findOrCreate(
        {where: {demo: demo}, defaults: {demo: demo}}
      );

      if(created || !created) {

        await tyreDemo.$add('tyres', id);

      }
      
    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  }

  async findAllTyreDemo() {

    try {

      const tyreAllDemo = await this.tyreDemoRepository.findAll({include: {all: true}});

      return tyreAllDemo;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

  async findTyreDemoById(getPropertyDto: GetPropertyDto) {

    try {

      const brandId = await this.tyreDemoRepository.findByPk(getPropertyDto.id_demo, {include: {all: true}});

      return brandId;

    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }

  }

  async updateTyreDemo( updatePropertyDto: UpdatePropertyDto) {

    try {

      const demoTyresId = await this.tyreDemoRepository.findByPk(updatePropertyDto.id_demo, {include: {all: true}});

      if(demoTyresId) {

        const updateDemo = await this.tyreDemoRepository.update(
        { demo: updatePropertyDto.demo}, {where: {id_demo : updatePropertyDto.id_demo}});

        return updateDemo; 

      }

      return new HttpException(`Data "id_country" or "country" is incorrect or Not Found`, HttpStatus.NOT_FOUND);
      
    } catch {

      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
  }

  async removeTyreDemo(getPropertyDto: GetPropertyDto) { 

    try {

      const removeDemoTyres = await this.tyreDemoRepository.destroy({where: {id_demo: getPropertyDto.id_demo}});
      
      return removeDemoTyres;

    } catch {
      
      throw new HttpException('Data is incorrect or Not Found', HttpStatus.NOT_FOUND);

    }
    
  }

}
