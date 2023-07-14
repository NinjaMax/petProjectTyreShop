import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
//import { OrdersService } from 'src/orders/orders.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { GetBasketDto } from './dto/get-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Basket } from './entities/basket.model';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket) private basketRepository: typeof Basket,
   //private orderssService: OrdersService,
  ){}

  async createBasket(createBasketDto: CreateBasketDto, session: string) {
    //try {
      const basketBySessionId = await this.basketRepository.findOne({
      where: { session_id: session ?? ''}
      });
      if (basketBySessionId) {
        await this.basketRepository.create({
          id_basket: basketBySessionId.id_basket,
          id_cat: createBasketDto.id_cat,
          id_goods: createBasketDto.id_goods,
          goods: createBasketDto.goods,
          quantity: createBasketDto.quantity,
          price: createBasketDto.price,
          session_id: session,
        });
        const getExistBasket = await this.basketRepository.findAll({
          where: {id_basket: basketBySessionId.id_basket}
        });
          return getExistBasket;
      } else {
        const basket = await this.basketRepository.create(
          {
            id_cat: createBasketDto.id_cat,
            id_goods: createBasketDto.id_goods,
            goods: createBasketDto.goods,
            quantity: createBasketDto.quantity,
            price: createBasketDto.price,
            session_id: session,
          }
        );
        return basket;
      }
      
    //} catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
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

  update(id: number, updateBasketDto: UpdateBasketDto) {
    return `This action updates a #${id} basket`;
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
