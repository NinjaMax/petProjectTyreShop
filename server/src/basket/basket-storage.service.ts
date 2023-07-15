import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
//import { Op } from 'sequelize';
import { CreateBasketDto } from './dto/create-basket.dto';
import { GetBasketDto } from './dto/get-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Basket_Storage } from './entities/basket-storage.model';

@Injectable()
export class BasketStorageService {
  constructor(
    @InjectModel(Basket_Storage)
    private basketStorageRepository: typeof Basket_Storage, //private ordersService: OrdersService
  ) {}

  async createBasketStorage(createBasketDto: CreateBasketDto) {
    // try {
      const basketStorage = await this.basketStorageRepository.create(
        createBasketDto,
      );

      return basketStorage;
    // } catch {
    //   throw new HttpException(
    //     'Data is incorrect and must be uniq',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }

  async findAllBasketStorage() {
    try {
      const basketStorageAll = await this.basketStorageRepository.findAll({
        include: { all: true },
      });

      return basketStorageAll;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllBasketStorageId(getBasketDto: GetBasketDto) {
    try {
      const basketStorageAllId = await this.basketStorageRepository.findAll({
        where: { id_basket: getBasketDto.id_basket },
      });

      return basketStorageAllId;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findBasketStorageById(getBasketDto: GetBasketDto) {
    try {
      const basketSupId = await this.basketStorageRepository.findByPk(
        getBasketDto.id_basket_storage,
        { include: { all: true } },
      );

      return basketSupId;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findBasketStorageOne(getBasketDto: GetBasketDto) {
    // try {
      const basketStorageOne = await this.basketStorageRepository.findOne({
        where: { id_basket_storage: getBasketDto.id_basket_storage ?? 0 },
      });
      if (basketStorageOne) {
        return basketStorageOne;
      } else {
        return null;
      }
    // } catch {
    //   throw new HttpException(
    //     'Data is incorrect and must be uniq',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }

  async findAllGoodsBasketStorage(getBasketDto: GetBasketDto) {
    try {
      const basketStorageOne = await this.basketStorageRepository.findAll({
        where: { id_basket: getBasketDto.id_basket },
      });

      return basketStorageOne;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateBasketStorage(updateBasketDto: UpdateBasketDto) {
    // try {
      const basketStorageUpdate = await this.basketStorageRepository.update(
        {
          id: updateBasketDto.id,
          id_cat: updateBasketDto.id_cat,
          quantity: updateBasketDto.quantity,
          price: updateBasketDto.price,
          id_supplier: updateBasketDto.id_supplier,
          id_storage: updateBasketDto.id_storage,
          category: updateBasketDto.category,
          id_basket: updateBasketDto.id_basket,
          full_name: updateBasketDto.full_name,
          season: updateBasketDto.season,
          ratingCount: updateBasketDto.ratingCount,
          reviewCount: updateBasketDto.reviewCount,
        },
        { where: { id_basket_storage: updateBasketDto.id_basket_storage } },
      );

      return basketStorageUpdate;
    // } catch {
    //   throw new HttpException(
    //     'Data is incorrect and must be uniq',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }

  async removeBasketStorageById(getBasketDto: GetBasketDto) {
    try {
      const basketSup = await this.basketStorageRepository.destroy({
        where: { id_basket_storage: getBasketDto.id_basket_storage },
      });

      return basketSup;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
