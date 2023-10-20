import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ItemPriceTyresConfigAttr } from './interfaces/priceItemTyre.interface';
import { UploaderPaprserService } from './uploaderParser.service';
import { PropsTyreCountryService } from '../properties/props-tyres-services/props-tyre-country.service';
import { CategorysService } from '../categorys/categorys.service';
import { PriceTyresService } from '../prices/price-tyres.service';
import { PropsBrandService } from '../properties/props-tyres-services/props-tyre-brand.service';
import { PropsTyreDemoService } from '../properties/props-tyres-services/props-tyre-demo.service';
import { PropsTyrDiametrService } from '../properties/props-tyres-services/props-tyre-diameter.service';
import { PropsTyreHeightService } from '../properties/props-tyres-services/props-tyre-height.service';
import { PropsTyreHomologationService } from '../properties/props-tyres-services/props-tyre-homologation.service';
import { PropsTyreLoadIndexService } from '../properties/props-tyres-services/props-tyre-loadIndex.service';
import { PropsModelService } from '../properties/props-tyres-services/props-tyre-model.service';
import { PropsTyreParamsService } from '../properties/props-tyres-services/props-tyre-params.service';
import { PropsTyreReinforceService } from '../properties/props-tyres-services/props-tyre-reinforce.service';
import { PropsTyreRunFlatService } from '../properties/props-tyres-services/props-tyre-runFlat.service';
import { PropsTyreSealService } from '../properties/props-tyres-services/props-tyre-seal.service';
import { PropsTyreSeasonService } from '../properties/props-tyres-services/props-tyre-season.service';
import { PropsTyreSilentService } from '../properties/props-tyres-services/props-tyre-silent.service';
import { PropsTyreSizeDigitsService } from '../properties/props-tyres-services/props-tyre-sizeDigits.service';
import { PropsTyreSpeedIndexService } from '../properties/props-tyres-services/props-tyre-speedIndex.service';
import { PropsTyreStuddedService } from '../properties/props-tyres-services/props-tyre-studded.service';
import { PropsTyreVehicleTypeService } from '../properties/props-tyres-services/props-tyre-vehicleType.service';
import { PropsTyreWidthService } from '../properties/props-tyres-services/props-tyre-width.service';
import { PropsTyreYearService } from '../properties/props-tyres-services/props-tyre-year.service';
import { StockTyresService } from '../stock/stock-tyres.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { TyresService } from '../tyres/tyres.service';

@Injectable()
export class AddTyresToDbService {
  constructor(
    private categoryService: CategorysService,
    private tyresservice: TyresService,
    private supplierService: SuppliersService,
    private stockTyresService: StockTyresService,
    private priceTyreService: PriceTyresService,
    private propsBrandService: PropsBrandService,
    private propsTyreCountry: PropsTyreCountryService,
    private propsTyreDemo: PropsTyreDemoService,
    private propsTyreDiameter: PropsTyrDiametrService,
    private propsTyreHeight: PropsTyreHeightService,
    private propsTyreHomologation: PropsTyreHomologationService,
    private propsTyreLoadIndex: PropsTyreLoadIndexService,
    private propsTyreModel: PropsModelService,
    private propsTyreParams: PropsTyreParamsService,
    private propsTyreReinforce: PropsTyreReinforceService,
    private propsTyreRunFlat: PropsTyreRunFlatService,
    private propsTyreSeal: PropsTyreSealService,
    private propsTyreSeason: PropsTyreSeasonService,
    private propsTyreSilent: PropsTyreSilentService,
    private propsTyreSizeDigits: PropsTyreSizeDigitsService,
    private propsTyreSpeedIndex: PropsTyreSpeedIndexService,
    private propsTyreStudded: PropsTyreStuddedService,
    private propsTyreVehicleType: PropsTyreVehicleTypeService,
    private propsTyreWidth: PropsTyreWidthService,
    private propsTyreYear: PropsTyreYearService,
  ) {}

  async addTyresToDb(item: ItemPriceTyresConfigAttr) {
    try {
      await this.tyresservice.createTyresFromPrice(
        +item['ID товара'],
        String(item['Артикул товару у постачальника']).replace(/#NULL!/g, ''),
        item['Полное название товара'] ?? '',
        item['Посилання на фото'] ?? '',
        item['Дата обновления'],
      );

      await this.supplierService.createSupplierFromPrice(
        +item['ID Постачальника'],
        item['Поставщик'] ?? '',
        item['Город'] ?? '',
        item['Город (укр)'] ?? '',
      );

      await this.categoryService.createCategoryFromPrice(
        +item['ID товара'],
        item['Категория товара'] ?? '',
      );

      await this.propsBrandService.createTyreBrandFromPrice(
        +item['ID товара'],
        +item['ID Бренда'],
        item['Бренд'] ?? '',
      );

      await this.propsTyreModel.createTyreModelFromPrice(
        +item['ID товара'],
        +item['ID Моделі'],
        item['Модель'] === 'undefined' ? '' : String(item['Модель']),
      );

      await this.propsTyreCountry.createTyreCountryFromPrice(
        +item['ID товара'],
        item['Страна производитель'] ?? '',
        item['Страна производитель (укр)'] ?? '',
      );

      await this.propsTyreDemo.createTyreDemoFromPrice(
        +item['ID товара'],
        item.demo ?? '',
      );

      await this.propsTyreDiameter.createTyreDiameterFromPrice(
        +item['ID товара'],
        String(item['Диаметр']).replace(/,/g, '.') === 'undefined'
          ? ''
          : String(item['Диаметр']).replace(/,/g, '.'),
      );

      await this.propsTyreHeight.createTyreHeightFromPrice(
        +item['ID товара'],
        String(item['Высота профиля']).replace(/,/g, '.') === 'undefined'
          ? ''
          : String(item['Высота профиля']).replace(/,/g, '.'),
      );

      await this.propsTyreHomologation.createTyreHomologationFromPrice(
        +item['ID товара'],
        item['Оммологация'] ?? '',
      );

      await this.propsTyreLoadIndex.createLoadIndexFromPrice(
        +item['ID товара'],
        String(item['Индекс нагрузки']) === 'undefined'
          ? ''
          : String(item['Индекс нагрузки']),
           item['Індекс навантаження з описом'] ?? '',
      );

      await this.propsTyreParams.createParamsFromPrice(
        +item['ID товара'],
        item['Параметры'] ?? '',
      );

      await this.propsTyreReinforce.createTyreReinforceFromPrice(
        +item['ID товара'],
        item['Усиление'] ?? '',
      );

      await this.propsTyreRunFlat.createTyreRunFlatFromPrice(
        +item['ID товара'],
        item['RunFlat'] ?? '',
      );

      await this.propsTyreSeal.createTyreSealFromPrice(
        +item['ID товара'],
        item.seal ?? '',
      );

      await this.propsTyreSeason.createTyreSeasonFromPrice(
        +item['ID товара'],
        +item['ID Сезону'],
        item['Сезон'] ?? '',
        item['Сезон (укр)'] ?? '',
      );

      await this.propsTyreSilent.createTyreSilentFromPrice(
        +item['ID товара'],
        item.silent ?? '',
      );

      await this.propsTyreSizeDigits.createTyreSizeDigitsFromPrice(
        +item['ID товара'],
        item['ID розміру'] ?? '',
      );

      await this.propsTyreSpeedIndex.createTyreSpeedIndexFromPrice(
        +item['ID товара'],
        item['Индекс скорости'] ?? '',
        item['Індекс швидкості з описом'] ?? '',
      );

      await this.propsTyreStudded.createTyreStuddedFromPrice(
        +item['ID товара'],
        item['Шип/не шип'] ?? '',
      );

      await this.propsTyreVehicleType.createTyreVehicleTypeFromPrice(
        +item['ID товара'],
        item['ID типу транспортного засобу (призначення)'] ?? Math.floor( Math.random() * 15) + 1,
        item['Тип транспортного средства (назначение)'] ?? '',
        item['Тип транспортного средства (назначение) (укр)'] ?? '',
      );

      await this.propsTyreWidth.createTyreWidthFromPrice(
        +item['ID товара'],
        String(item['Ширина профиля']).replace(/,/g, '.') === 'undefined'
          ? ''
          : String(item['Ширина профиля']).replace(/,/g, '.'),
      );

      await this.propsTyreYear.createTyreYearFromPrice(
        +item['ID товара'],
        item['Год изготовления шин'] ?? '',
      );

      await this.stockTyresService.createStockTyreFromPrice(
        +item['ID товара'],
        +item['В наличии'],
        +item['ID Постачальника'],
        item['Дата обновления'],
      );

      await this.priceTyreService.createPriceTyresFromPrice(
        +item['ID товара'],
        +item['Моя оптовая цена (со скидкой)'],
        +item['Моя розничная цена'],
        +item['Моя ціна доставки'],
        +item['Моя роздрібна ціна+доставка'],
        +item['ID Постачальника'],
        item['Дата обновления'],
      );

      return 'Price added to DATA BASE';
    } catch (error) {
      console.log('ERROR', error);
      throw new HttpException(
        'Data is incorrect, check your data',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
