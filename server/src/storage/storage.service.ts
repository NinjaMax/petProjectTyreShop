import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStorageDto } from './dto/create-storage.dto';
import { GetStorageDto } from './dto/get-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { Storage } from './entities/storage.model';

@Injectable()
export class StorageService {

  constructor(@InjectModel(Storage) private storageRepository: typeof Storage,
    ) {}

  async createStorage(createStorageDto: CreateStorageDto) {

    try {
      
      const storage = await this.storageRepository.create(createStorageDto);

      return storage;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllStorage() {

    try {
      
      const storageAll = await this.storageRepository.findAll();

      return storageAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllStorageStock() {

    try {
      
      const storageAllStock = await this.storageRepository.findAll(
        {where: {stock_tyres: {include: {all: true}},
        stock_wheels: {include: {all: true}},
        stock_batteries: {include: {all: true}},
        stock_oils: {include: {all: true}}}}
        );

      return storageAllStock;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findStorageById(getStorageDto: GetStorageDto) {

    try {
      
      const storageById = await this.storageRepository.findByPk(getStorageDto.id_storage, {include: {all: true}} );

      return storageById;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateStorageDto: UpdateStorageDto) {
    return `This action updates a #${id} storage`;
  }

  async removeStorage(getStorageDto: GetStorageDto) {

    try {
      
      const storageRemove = await this.storageRepository.destroy({where: {id_storage: getStorageDto.id_storage}});

      return storageRemove;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}
