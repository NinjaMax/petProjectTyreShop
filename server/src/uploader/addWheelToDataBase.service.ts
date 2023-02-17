import { Injectable,  HttpException, HttpStatus } from '@nestjs/common';
import { SuppliersService } from 'src/suppliers/suppliers.service';
import { CategorysService } from 'src/categorys/categorys.service';
import { PriceWheelsService } from 'src/prices/price-wheels.service';
import { PropsWheelBoltCountService } from 'src/properties/props-wheel-services/props-wheel-boltCount.service';
import { PropsWheelBoltCountPcdService } from 'src/properties/props-wheel-services/props-wheel-boltCountPcd.service';
import { PropsWheelBrandService } from 'src/properties/props-wheel-services/props-wheel-brand.service';
import { PropsWheelColorService } from 'src/properties/props-wheel-services/props-wheel-color.service';
import { PropsWheelDiaService } from 'src/properties/props-wheel-services/props-wheel-dia.service';
import { PropsWheelDiameterService } from 'src/properties/props-wheel-services/props-wheel-diameter.service';
import { PropsWheelEtService } from 'src/properties/props-wheel-services/props-wheel-et.service';
import { PropsWheelModelService } from 'src/properties/props-wheel-services/props-wheel-model.service';
import { PropsWheelPcdService } from 'src/properties/props-wheel-services/props-wheel-pcd.service';
import { PropsWheelPcd2Service } from 'src/properties/props-wheel-services/props-wheel-pcd2.service';
import { PropsWheelSizeDigitsService } from 'src/properties/props-wheel-services/props-wheel-sizeDigits.service';
import { PropsWheelTypeService } from 'src/properties/props-wheel-services/props-wheel-type.service';
import { PropsWheelWidthService } from 'src/properties/props-wheel-services/props-wheel-width.service';
import { StockWheelsService } from 'src/stock/stock-wheels.service';
import { WheelsService } from 'src/wheels/wheels.service';
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
    private propsWheelWidthService: PropsWheelWidthService
  ) {

  }
    
  async addWheelsToDb(item: ItemPriceWheelConfigAttr) {
    
    try {

      await this.wheelsService.createWheelFromPrice(
        +item.id, 
        item.full_name ?? '',
        item.fullname_color_full ?? '',
        item.fullname_hotline ?? '',
        item.photo_url ?? '',
        item.update_date 
      );
   
      await this.categoryService.createCategoryWheelFromPrice(
        +item.id,
        item.price_list_type ?? ''
      );
    
      await this.supplierService.createSupplierFromPrice(
        +item.provider_id, 
        String(item.provider) === 'undefined' ? '' : String(item.provider),
        item.city ?? '', 
        item.city_ua ?? ''
      );

      await this.propsWheelBrandService.createWheelBrandFromPrice(
        +item.id, 
        item.brand ?? ''
      );

      await this.propsWheelModelService.createWheelModelFromPrice(
        +item.id, 
        item.model_id,
        String(item.model) === 'undefined' ? '' : String(item.model)
      );

      await this.propsWheelWidthService.createWheelWidthFromPrice( 
        +item.id,
        String(item.width).replace(/,/g, ".") === 'undefined' ? '' : String(item.width).replace(/,/g, "."),
      );

      await this.propsWheelPcdService.createWheelPcdFromPrice(
        item.id,
        String(item.pcd).replace(/,/g, ".") === 'undefined' ? '' : String(item.pcd).replace(/,/g, "."),
      );

      await this.propsWheelPcd2Service.createWheelPcd2FromPrice( 
        item.id,
        String(item.pcd2).replace(/,/g, ".") === 'undefined' ? '' : String(item.pcd2).replace(/,/g, "."),
      );

      await this.propsWheelBoltCountService.createWheelBoltCountFromPrice( 
        +item.id,
        String(item.bolt_count).replace(/,/g, ".") === 'undefined' ? '' : String(item.bolt_count).replace(/,/g, "."),
      );

      await this.propsWheelBoltCountPcdService.createWheelBoltCountPcdFromPrice( 
        +item.id, 
        String(item.bolt_count_pcd).replace(/,/g, ".") === 'undefined' ? '' : String(item.bolt_count_pcd).replace(/,/g, "."),
      );

      await this.propsWheelColorService.createWheelColorFromPrice( 
        +item.id,
        item.color_id ?? 999, 
        item.color ?? '', 
        item.color_short ?? ''
      );

      await this.propsWheelDiameter.createWheelDiameterFromPrice( 
        item.id,
        String(item.diameter).replace(/,/g, ".") === 'undefined' ? '' : String(item.diameter).replace(/,/g, "."),
      );

      await this.propsWheelDiaService.createWheelDiaFromPrice( 
        item.id,
        String(item.dia).replace(/,/g, ".") === 'undefined' ? '' : String(item.dia).replace(/,/g, "."),
      );

      await this.propsWheelEtService.createWheelEtFromPrice( 
        item.id,
        String(item.et).replace(/,/g, ".") === 'undefined' ? '' : String(item.et).replace(/,/g, "."),
      );

      await this.propsWheelTypeService.createWheelTypeFromPrice( 
        +item.id,
        item.type_id ?? 999,
        item.type ?? ''
      );

      await this.propsWheelSizeDigitsService.createWheelSizeDigitsFromPrice( 
        item.id,
        item.size_only_digits ?? ''
      );

      await this.stockWheelService.createStockWheelFromPrice(
        +item.id,
        +item.in_stock,
        +item.provider_id,
        item.update_date,
      );
        
      await this.priceWheelService.createPriceWheelsFromPrice(
        +item.id,
        +item.user_price_wholesale,
        +item.user_price,
        +item.user_delivery_price,
        +item.user_price_plus_user_delivery_price,
        +item.provider_id,
        item.update_date,
      );

      return  'Price added to DATA BASE';

    } catch (error) {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }

  } 

}