import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateServiceDto } from './dto/create-service.dto';
import { GetServiceDto } from './dto/get-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {

  constructor(@InjectModel(Service) private servicesRepository: typeof Service,
    ) {}

  async createService(createServiceDto: CreateServiceDto) {

    try {
      
      const service = await this.servicesRepository.create(createServiceDto);

      return service;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllService() {

    try {
      
      const serviceAll = await this.servicesRepository.findAll({include: {all: true}});

      return serviceAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findServiceById(getServiceDto: GetServiceDto) {

    try {
      
      const serviceById = await this.servicesRepository.findByPk(getServiceDto.id_service, {include: {all: true}});

      return serviceById;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  async removeService(getServiceDto: GetServiceDto) {

    try {
      
      const serviceRemove = await this.servicesRepository.destroy({where:{ id_service: getServiceDto.id_service}});

      return serviceRemove;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}
