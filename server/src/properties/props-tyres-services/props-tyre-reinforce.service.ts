import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreReinforce } from '../entities/tyres/tyre-reinforce.model';

@Injectable()
export class PropsTyreReinforceService {
  constructor(
    @InjectModel(TyreReinforce)
    private tyreReinforceRepository: typeof TyreReinforce,
    private tyresService: TyresService,
  ) {}

  async createTyreReinforce(createPropertyDto: CreatePropertyDto) {
    try {
      const tyreId = await this.tyresService.findTyresById(createPropertyDto);
      const tyreReinforce = await this.tyreReinforceRepository.findOne({
        where: { reinforce: createPropertyDto.reinforce },
      });

      if (tyreId && tyreReinforce) {
        const updateReinforce = await this.tyreReinforceRepository.update(
          {
            reinforce: createPropertyDto.reinforce,
          },
          { where: { id_reinforce: tyreReinforce.id_reinforce } },
        );
        await tyreId.$set('reinforce', updateReinforce);
        //tyreId.country = tyreCountry;
        //updateCountry.reload();

        return updateReinforce;
      } else if (tyreId && !tyreReinforce) {
        const newTyreReinforce = await this.tyreReinforceRepository.create(
          createPropertyDto,
        );

        await tyreId.$set('reinforce', newTyreReinforce);
        //tyreId.country = tyreCountry;
        //tyreCountry.reload();

        return newTyreReinforce;
      } else {
        const tyreReinforce = await this.tyreReinforceRepository.create(
          createPropertyDto,
        );

        return tyreReinforce;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async createTyreReinforceFromPrice(id: number, reinforce: string) {
    try {
      const [tyreReinforce, created] =
        await this.tyreReinforceRepository.findOrCreate({
          where: { reinforce: reinforce },
          defaults: { reinforce: reinforce },
        });

      if (created || !created) {
        await tyreReinforce.$add('tyres', id);
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllTyreReinforce() {
    try {
      const tyreAllReinforce = await this.tyreReinforceRepository.findAll();
      return tyreAllReinforce;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findTyreReinforceById(getPropertyDto: GetPropertyDto) {
    try {
      const reinforceId = await this.tyreReinforceRepository.findByPk(
        getPropertyDto.id_reinforce,
        { include: { all: true } },
      );

      return reinforceId;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateTyreReinforce(updatePropertyDto: UpdatePropertyDto) {
    try {
      const reinforceTyresId = await this.tyreReinforceRepository.findByPk(
        updatePropertyDto.id_reinforce,
        { include: { all: true } },
      );

      if (reinforceTyresId) {
        const updateReinforce = await this.tyreReinforceRepository.update(
          { reinforce: updatePropertyDto.reinforce },
          { where: { id_reinforce: updatePropertyDto.id_reinforce } },
        );

        return updateReinforce;
      }

      return new HttpException(
        `Data "id_reinforce" or "reinforce" is incorrect or Not Found`,
        HttpStatus.NOT_FOUND,
      );
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeTyreReinforce(getPropertyDto: GetPropertyDto) {
    try {
      const removeTyreReinforces = await this.tyreReinforceRepository.destroy({
        where: { id_reinforce: getPropertyDto.id_reinforce },
      });

      return removeTyreReinforces;
    } catch {
      throw new HttpException(
        'Data is incorrect or Not Found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
