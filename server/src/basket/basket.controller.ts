import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { GetBasketDto } from './dto/get-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { BasketStorageService } from './basket-storage.service';

@Controller('basket')
export class BasketController {
  constructor(
    private readonly basketService: BasketService,
    private readonly basketStorageService: BasketStorageService
    ) {}

  @Post()
  create(
    @Session() session: Record<string, any>,
    @Body() createBasketDto: CreateBasketDto,
  ) {
    //console.log('SESSION_ID: ', session.id);
    return this.basketService.createBasket(createBasketDto, session.id);
  }

  @Post('/add-goods')
  addToBasket(@Body() createBasketDto: CreateBasketDto) {
    return this.basketService.addGoodsToBasket(createBasketDto);
  }

  @Get('/all')
  findAll() {
    return this.basketService.findAllbasket();
  }

  @Get('/by-id')
  findOne(@Param() @Body() getBasketDto: GetBasketDto) {
    return this.basketService.findBasketById(getBasketDto);
  }

  @Get('/by-session')
  findBasketOne(@Session() session: Record<string, any>) {
    return this.basketService.findBasketBySession(session.id);
  }

  @Patch('/update')
  update(@Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.updateBasket(updateBasketDto);
  }

  @Patch('/update/basketstorage')
  updateBasketStorage(
    @Body() updateBasketDto: UpdateBasketDto, 
    //basketStorageId: number
    ){
    return this.basketStorageService.updateBasketStorage(
      updateBasketDto,
      updateBasketDto.id_basket_storage
    );
  }

  @Delete('remove/basketstorage/:id')
  removeBasketStorage(@Param('id') id: string) {
    return this.basketStorageService.removeBasketStorageById(+id);
  }

  @Delete('remove')
  remove(@Param() @Body() getBasketDto: GetBasketDto) {
    return this.basketService.removeBasket(getBasketDto);
  }
}
