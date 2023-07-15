import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
//import { OrdersService } from 'src/orders/orders.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { GetBasketDto } from './dto/get-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Basket } from './entities/basket.model';
import { BasketStorageService } from './basket-storage.service';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket) private basketRepository: typeof Basket,
    private basketStorageService: BasketStorageService,
  ){}

  async createBasket(createBasketDto: CreateBasketDto, session: string) {
    //try {
      const basketBySessionId = await this.basketRepository.findOne({
        where: { session_id: session ?? '', checkedIn: false },
      });
      if (basketBySessionId) {
        await this.basketRepository.update(
          {
            name: createBasketDto.name,
            phone: createBasketDto.phone,
            email: createBasketDto.email,
            address: createBasketDto.address,
            notes: createBasketDto.notes,
            storage: createBasketDto.storage,
            delivery: createBasketDto.delivery,
            pay_view: createBasketDto.pay_view,
            dop_garanty: createBasketDto.dop_garanty,
            session_id: session,
            checkedIn: createBasketDto.checkedIn,
            //id_basket_storage: updateBasketDto.id_basket_storage,
          },
          { where: { id_basket: basketBySessionId.id_basket } },
          );
          basketBySessionId.reload();
          return basketBySessionId;
      } else {
        const basketNew = await this.basketRepository.create({
          name: createBasketDto.name,
          phone: createBasketDto.phone,
          email: createBasketDto.email,
          address: createBasketDto.address,
          notes: createBasketDto.notes,
          storage: createBasketDto.storage,
          delivery: createBasketDto.delivery,
          pay_view: createBasketDto.pay_view,
          dop_garanty: createBasketDto.dop_garanty,
          session_id: session,
          checkedIn: createBasketDto.checkedIn,
          });
        return basketNew;
      }
      
    //} catch {
      // throw new HttpException(
      //   'Data is incorrect and must be uniq',
      //   HttpStatus.NOT_FOUND,
      // );
    //}
  }

  async findAllbasket() {
    try {
      const basketAll = await this.basketRepository.findAll({
        include: { all: true },
      });
      return basketAll;
    } catch {

      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findBasketById(getBasketDto: GetBasketDto) {
    try {
      const basketId = await this.basketRepository.findByPk(
        getBasketDto.id_basket,
        { include: { all: true } },
      );
      return basketId;

    } catch {
      throw new HttpException(
        `Data ${getBasketDto.id_basket} is incorrect and must be uniq`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async addGoodsToBasket(createBasketDto: CreateBasketDto) {
    //try {
      const findGoodsToBasket =
        await this.basketStorageService.findBasketStorageOne(createBasketDto);

      if (findGoodsToBasket) {
        const updateBasketStor =
          await this.basketStorageService.updateBasketStorage(createBasketDto);

        return updateBasketStor;
      } else {
        const basketStorage =
          await this.basketStorageService.createBasketStorage(createBasketDto);

        return basketStorage;
      }
    //} catch {
      // throw new HttpException(
      //   'Data is incorrect and must be uniq',
      //   HttpStatus.NOT_FOUND,
      // );
    //}
  }

  async updateBasket(updateBasketDto: UpdateBasketDto) {
    //try {
      const basketStorageUpdate = await this.basketRepository.update(
        {
          //id: updateBasketDto.id,
          name: updateBasketDto.name,
          phone: updateBasketDto.phone,
          email: updateBasketDto.email,
          address: updateBasketDto.address,
          notes: updateBasketDto.notes,
          storage: updateBasketDto.storage,
          delivery: updateBasketDto.delivery,
          pay_view: updateBasketDto.pay_view,
          dop_garanty: updateBasketDto.dop_garanty,
          session_id: updateBasketDto.session_id,
          checkedIn: updateBasketDto.checkedIn,
          //id_basket_storage: updateBasketDto.id_basket_storage,
        },
        { where: { id_basket: updateBasketDto.id_basket } },
      );

      return basketStorageUpdate;
    // } catch {
    //   throw new HttpException(
    //     'Data is incorrect and must be uniq',
    //     HttpStatus.NOT_FOUND,
    //   );
    //}
  }

  async removeBasket(getBasketDto: GetBasketDto) {

    try {
      const removeBasket = await this.basketRepository.destroy({
        where: { id_basket: getBasketDto.id_basket },
      });
      return removeBasket;

    } catch {
      throw new HttpException(
        `Data ${getBasketDto.id_basket} is incorrect and must be uniq`,
        HttpStatus.NOT_FOUND,)
    }
  }
}
