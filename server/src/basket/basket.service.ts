import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
//import { OrdersService } from 'src/orders/orders.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { GetBasketDto } from './dto/get-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { Basket } from './entities/basket.model';
import { BasketStorageService } from './basket-storage.service';
import { Basket_Storage } from './entities/basket-storage.model';

@Injectable()
export class BasketService {
  constructor(
    @InjectModel(Basket) private basketRepository: typeof Basket,
    private basketStorageService: BasketStorageService,
  ){}

  async createBasket(createBasketDto: CreateBasketDto, session: string) {
    try {
      const basketBySessionId = await this.basketRepository.findOne({
        where: { session_id: session ?? '', checkedIn: false },
        include: [Basket_Storage],
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
            delivery_dep: createBasketDto.delivery_dep,
            delivery_dep_ref: createBasketDto.delivery_dep_ref,
            city_delivery: createBasketDto.city_delivery,
            ref_city_delivery: createBasketDto.ref_city_delivery,
            pay_view: createBasketDto.pay_view,
            dop_garanty: createBasketDto.dop_garanty,
            session_id: session,
            id_customer: createBasketDto.id_customer,
            checkedIn: createBasketDto.checkedIn,
            delivery_cost: createBasketDto.delivery_cost,
            commission_cost: createBasketDto.commission_cost,
            bonus_decrease: createBasketDto.bonus_decrease,
            total_cost: createBasketDto.total_cost,
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
          delivery_dep: createBasketDto.delivery_dep,
          delivery_dep_ref: createBasketDto.delivery_dep_ref,
          pay_view: createBasketDto.pay_view,
          dop_garanty: createBasketDto.dop_garanty,
          session_id: session,
          checkedIn: createBasketDto.checkedIn,
          delivery_cost: createBasketDto.delivery_cost,
          commission_cost: createBasketDto.commission_cost,
          bonus_decrease: createBasketDto.bonus_decrease,
          total_cost: createBasketDto.total_cost,
          id_customer: createBasketDto.id_customer,
        });
        return basketNew;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
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

  async findBasketBySession(session: string) {
    try {
      const basketOneBySessionId = await this.basketRepository.findOne({
        where: { session_id: session ?? '', checkedIn: false },
        include: [Basket_Storage],
      });
      return basketOneBySessionId;
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

  async findBasketByIdParam(id: number) {
    try {
      const basketId = await this.basketRepository.findByPk(id,{
        include: [Basket_Storage]
      });
      return basketId;

    } catch {
      throw new HttpException(
        `Data ${id} is incorrect and must be uniq`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async addGoodsToBasket(createBasketDto: CreateBasketDto) {
    try {
      const findGoodsToBasket =
        await this.basketStorageService.findBasketStorageOne(createBasketDto);

      if (findGoodsToBasket) {
        const updateBasketStor =
          await this.basketStorageService.updateBasketStorage(
            createBasketDto,
            findGoodsToBasket.id_basket_storage
          );

        return updateBasketStor;
      } else {
        const basketStorage =
          await this.basketStorageService.createBasketStorage(createBasketDto);

        return basketStorage;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateBasket(updateBasketDto: UpdateBasketDto) {
    try {
      if (updateBasketDto.id_basket) {
        await this.basketRepository.update(
          {
            //id: updateBasketDto.id,
            name: updateBasketDto.name,
            phone: updateBasketDto.phone,
            email: updateBasketDto.email,
            address: updateBasketDto.address,
            notes: updateBasketDto.notes,
            storage: updateBasketDto.storage,
            delivery: updateBasketDto.delivery,
            delivery_dep: updateBasketDto.delivery_dep,
            delivery_dep_ref: updateBasketDto.delivery_dep_ref,
            city_delivery: updateBasketDto.city_delivery,
            ref_city_delivery: updateBasketDto.ref_city_delivery,
            pay_view: updateBasketDto.pay_view,
            dop_garanty: updateBasketDto.dop_garanty,
            checkedIn: updateBasketDto.checkedIn,
            delivery_cost: updateBasketDto.delivery_cost,
            commission_cost: updateBasketDto.commission_cost,
            bonus_decrease: updateBasketDto.bonus_decrease,
            total_cost: updateBasketDto.total_cost,
            id_customer: updateBasketDto.id_customer,
          },
          { where: { id_basket: updateBasketDto.id_basket } },
        );
        const basketAfterUpdate = await this.basketRepository.findByPk(
          updateBasketDto.id_basket,
          { include: [Basket_Storage] },
        ); 
        return basketAfterUpdate;
      } else {
        return null;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
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
