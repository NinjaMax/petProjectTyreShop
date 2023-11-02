import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SuppliersService } from '../suppliers/suppliers.service';
import { CategorysService } from '../categorys/categorys.service';
import { PriceWheelsService } from '../prices/price-wheels.service';
import { PropsWheelBoltCountService } from '../properties/props-wheel-services/props-wheel-boltCount.service';
import { PropsWheelBoltCountPcdService } from '../properties/props-wheel-services/props-wheel-boltCountPcd.service';
import { PropsWheelBrandService } from '../properties/props-wheel-services/props-wheel-brand.service';
import { PropsWheelColorService } from '../properties/props-wheel-services/props-wheel-color.service';
import { PropsWheelDiaService } from '../properties/props-wheel-services/props-wheel-dia.service';
import { PropsWheelDiameterService } from '../properties/props-wheel-services/props-wheel-diameter.service';
import { PropsWheelEtService } from '../properties/props-wheel-services/props-wheel-et.service';
import { PropsWheelModelService } from '../properties/props-wheel-services/props-wheel-model.service';
import { PropsWheelPcdService } from '../properties/props-wheel-services/props-wheel-pcd.service';
import { PropsWheelPcd2Service } from '../properties/props-wheel-services/props-wheel-pcd2.service';
import { PropsWheelSizeDigitsService } from '../properties/props-wheel-services/props-wheel-sizeDigits.service';
import { PropsWheelTypeService } from '../properties/props-wheel-services/props-wheel-type.service';
import { PropsWheelWidthService } from '../properties/props-wheel-services/props-wheel-width.service';
import { StockWheelsService } from '../stock/stock-wheels.service';
import { WheelsService } from '../wheels/wheels.service';
import { ItemPriceWheelConfigAttr } from './interfaces/priceItemWheel.interface';

@Injectable()
export class AddWheelsToDbService {
  constructor(
    private categoryService: CategorysService,
    private supplierService: SuppliersService,
    private wheelsService: WheelsService,
    private stockWheelService: StockWheelsService,
    private priceWheelService: PriceWheelsService,
    private propsWheelBrandService: PropsWheelBrandService,
    private propsWheelBoltCountService: PropsWheelBoltCountService,
    private propsWheelBoltCountPcdService: PropsWheelBoltCountPcdService,
    private propsWheelColorService: PropsWheelColorService,
    private propsWheelDiaService: PropsWheelDiaService,
    private propsWheelDiameter: PropsWheelDiameterService,
    private propsWheelEtService: PropsWheelEtService,
    private propsWheelModelService: PropsWheelModelService,
    private propsWheelPcdService: PropsWheelPcdService,
    private propsWheelPcd2Service: PropsWheelPcd2Service,
    private propsWheelSizeDigitsService: PropsWheelSizeDigitsService,
    private propsWheelTypeService: PropsWheelTypeService,
    private propsWheelWidthService: PropsWheelWidthService,
  ) {}

  async addWheelsToDb(item: ItemPriceWheelConfigAttr) {
    //try {
      await this.wheelsService.createWheelFromPrice(
        +item['ID товара'],
        String(item['Артикул товару у постачальника']).replace(/#NULL!/g, ''),
        item['Полное название товара'] ?? '',
        item['Полное название товара (+полное название цвета)'] ?? '',
        item['Полное название товара (Hotline)'] ?? '',
        item['Посилання на фото'] ?? '',
        item['Дата обновления'],
      );

      await this.categoryService.createCategoryWheelFromPrice(
        +item['ID товара'],
        item['Категорія товару'] ?? '',
        'Диски',
        
      );

      await this.supplierService.createSupplierFromPrice(
        +item['ID Постачальника'],
        String(item['Поставщик']) === 'undefined'
          ? ''
          : String(item['Поставщик']),
        item['Город'] ?? '',
        item['Город (укр)'] ?? '',
      );

      await this.propsWheelBrandService.createWheelBrandFromPrice(
        +item['ID товара'],
        item['Бренд'] ?? '',
      );

      await this.propsWheelModelService.createWheelModelFromPrice(
        +item['ID товара'],
        item['ID Моделі'],
        String(item['Модель']) === 'undefined' ? '' : String(item['Модель']),
      );

      await this.propsWheelWidthService.createWheelWidthFromPrice(
        +item['ID товара'],
        String(item['Ширина диска']).replace(/,/g, '.') === 'undefined'
          ? ''
          : String(item['Ширина диска']).replace(/,/g, '.'),
      );

      await this.propsWheelPcdService.createWheelPcdFromPrice(
        +item['ID товара'],
        String(item['PCD1']).replace(/,/g, '.') === 'undefined'
          ? ''
          : String(item['PCD1']).replace(/,/g, '.'),
      );

      await this.propsWheelPcd2Service.createWheelPcd2FromPrice(
        +item['ID товара'],
        String(item['PCD2']).replace(/,/g, '.') === 'undefined'
          ? ''
          : String(item['PCD2']).replace(/,/g, '.'),
      );

      await this.propsWheelBoltCountService.createWheelBoltCountFromPrice(
        +item['ID товара'],
        String(item['Кріплення']).replace(/,/g, '.') === 'undefined'
          ? ''
          : String(item['Кріплення']).replace(/,/g, '.'),
      );

      await this.propsWheelBoltCountPcdService.createWheelBoltCountPcdFromPrice(
        +item['ID товара'],
        String(item['Кріплення+PCD']).replace(/,/g, '.') === 'undefined'
          ? ''
          : String(item['Кріплення+PCD']).replace(/,/g, '.'),
      );

      await this.propsWheelColorService.createWheelColorFromPrice(
        +item['ID товара'],
        item['ID кольору'] === '' || item['ID кольору'] === 'undefined'
          ? '999'
          : item['ID кольору'],
        item['Колір'] ?? '',
        item['Колір абревіатура'] ?? '',
      );

      await this.propsWheelDiameter.createWheelDiameterFromPrice(
        +item['ID товара'],
        String(item['Диаметр']).replace(/,/g, '.') === 'undefined'
          ? ''
          : String(item['Диаметр']).replace(/,/g, '.'),
      );

      await this.propsWheelDiaService.createWheelDiaFromPrice(
        +item['ID товара'],
        String(item['DIA']).replace(/,/g, '.') === 'undefined'
          ? ''
          : String(item['DIA']).replace(/,/g, '.'),
      );

      await this.propsWheelEtService.createWheelEtFromPrice(
        +item['ID товара'],
        String(item['ET']).replace(/,/g, '.') === 'undefined'
          ? ''
          : String(item['ET']).replace(/,/g, '.'),
      );

      await this.propsWheelTypeService.createWheelTypeFromPrice(
        +item['ID товара'],
        item['ID Типу диска'] === '' || item['ID Типу диска'] === 'undefined'
        ? Math.floor(Math.random() + 1) + '999'
          : item['ID Типу диска'],
        item['Тип диска'] ?? '',
      );

      await this.propsWheelSizeDigitsService.createWheelSizeDigitsFromPrice(
        +item['ID товара'],
        item['ID розміру'] ?? '',
      );

      await this.stockWheelService.createStockWheelFromPrice(
        +item['ID товара'],
        +item['В наличии'],
        +item['ID Постачальника'],
        item['Дата обновления'],
      );

      await this.priceWheelService.createPriceWheelsFromPrice(
        +item['ID товара'],
        item['Моя оптовая цена (со скидкой)'] ?? 0,
        item['Моя розничная цена'] ?? 0,
        item['Моя ціна доставки'] ?? 0,
        item['Моя розничная цена+доставка'] ?? 0,
        +item['ID Постачальника'],
        item['Дата обновления'],
      );

      return 'Price added to DATA BASE';
    // } catch (error) {
    //   throw new HttpException(
    //     'Data is incorrect and must be uniq',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }
}
