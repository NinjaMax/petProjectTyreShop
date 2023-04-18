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
        +item.id,
        item.full_name ?? '',
        item.photo_url ?? '',
        item.update_date,
      );

      await this.categoryService.createCategoryFromPrice(
        +item.id,
        item.price_list_type ?? '',
      );

      await this.supplierService.createSupplierFromPrice(
        +item.provider_id,
        item.provider ?? '',
        item.city ?? '',
        item.city_ua ?? '',
      );

      await this.propsBrandService.createTyreBrandFromPrice(
        +item.id,
        +item.brand_id,
        item.brand ?? '',
      );

      await this.propsTyreModel.createTyreModelFromPrice(
        +item.id,
        +item.model_id,
        String(item.model) === 'undefined' ? '' : String(item.model),
      );

      await this.propsTyreCountry.createTyreCountryFromPrice(
        +item.id,
        item.country_manufacturer ?? '',
        item.country_manufacturer_ua ?? '',
      );

      await this.propsTyreDemo.createTyreDemoFromPrice(
        +item.id,
        item.demo ?? '',
      );

      await this.propsTyreDiameter.createTyreDiameterFromPrice(
        +item.id,
        String(item.diameter).replace(/,/g, '.') === 'undefined'
          ? ''
          : String(item.diameter).replace(/,/g, '.'),
      );

      await this.propsTyreHeight.createTyreHeightFromPrice(
        +item.id,
        String(item.height).replace(/,/g, '.') === 'undefined'
          ? ''
          : String(item.height).replace(/,/g, '.'),
      );

      await this.propsTyreHomologation.createTyreHomologationFromPrice(
        +item.id,
        item.homologation ?? '',
      );

      await this.propsTyreLoadIndex.createLoadIndexFromPrice(
        +item.id,
        String(item.load_index) === 'undefined' ? '' : String(item.load_index),
        item.load_index_with_desc ?? '',
      );

      await this.propsTyreParams.createParamsFromPrice(
        +item.id,
        item.params ?? '',
      );

      await this.propsTyreReinforce.createTyreReinforceFromPrice(
        +item.id,
        item.reinforce ?? '',
      );

      await this.propsTyreRunFlat.createTyreRunFlatFromPrice(
        +item.id,
        item.run_flat ?? '',
      );

      await this.propsTyreSeal.createTyreSealFromPrice(
        +item.id,
        item.seal ?? '',
      );

      await this.propsTyreSeason.createTyreSeasonFromPrice(
        +item.id,
        +item.season_id,
        item.season ?? '',
        item.season_ua ?? '',
      );

      await this.propsTyreSilent.createTyreSilentFromPrice(
        +item.id,
        item.silent ?? '',
      );

      await this.propsTyreSizeDigits.createTyreSizeDigitsFromPrice(
        +item.id,
        item.size_only_digits ?? '',
      );

      await this.propsTyreSpeedIndex.createTyreSpeedIndexFromPrice(
        +item.id,
        item.speed_index ?? '',
        item.speed_index_with_desc ?? '',
      );

      await this.propsTyreStudded.createTyreStuddedFromPrice(
        +item.id,
        item.studded ?? '',
      );

      await this.propsTyreVehicleType.createTyreVehicleTypeFromPrice(
        +item.id,
        +item.vehicle_type_id,
        item.vehicle_type ?? '',
        item.vehicle_type_ua ?? '',
      );

      await this.propsTyreWidth.createTyreWidthFromPrice(
        +item.id,
        String(item.width).replace(/,/g, '.') === 'undefined'
          ? ''
          : String(item.width).replace(/,/g, '.'),
      );

      await this.propsTyreYear.createTyreYearFromPrice(
        +item.id,
        item.manufacture_year ?? '',
      );

      await this.stockTyresService.createStockTyreFromPrice(
        +item.id,
        +item.in_stock,
        +item.provider_id,
        item.update_date,
      );

      await this.priceTyreService.createPriceTyresFromPrice(
        +item.id,
        +item.user_price_wholesale,
        +item.user_price,
        +item.user_delivery_price,
        +item.user_price_plus_user_delivery_price,
        +item.provider_id,
        item.update_date,
      );

      return 'Price added to DATA BASE';
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
