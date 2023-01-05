import { Injectable } from '@nestjs/common';
import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
import * as fs from 'fs';
import { join } from 'path';
import { PriceParserTyresOptions } from './interfaces/priceParserTyres.interface';
import { XMLParser } from 'fast-xml-parser';
import { TyresService } from 'src/tyres/tyres.service';
import { SuppliersService } from 'src/suppliers/suppliers.service';
import { StockTyresService } from 'src/stock/stock-tyres.service';
import { PriceTyresService } from 'src/prices/price-tyres.service';
import { StockWheelsService } from 'src/stock/stock-wheels.service';
import { PriceWheelsService } from 'src/prices/price-wheels.service';
import { CategorysService } from 'src/categorys/categorys.service';
import { PropsBrandService } from 'src/properties/props-tyres-services/props-tyre-brand.service';
import { PropsTyreYearService } from 'src/properties/props-tyres-services/props-tyre-year.service';
import { PropsTyreWidthService } from 'src/properties/props-tyres-services/props-tyre-width.service';
import { PropsTyreVehicleTypeService } from 'src/properties/props-tyres-services/props-tyre-vehicleType.service';
import { PropsTyreStuddedService } from 'src/properties/props-tyres-services/props-tyre-studded.service';
import { PropsTyreSpeedIndexService } from 'src/properties/props-tyres-services/props-tyre-speedIndex.service';
import { PropsTyreSizeDigitsService } from 'src/properties/props-tyres-services/props-tyre-sizeDigits.service';
import { PropsTyreSilentService } from 'src/properties/props-tyres-services/props-tyre-silent.service';
import { PropsTyreSeasonService } from 'src/properties/props-tyres-services/props-tyre-season.service';
import { PropsTyreSealService } from 'src/properties/props-tyres-services/props-tyre-seal.service';
import { PropsTyreRunFlatService } from 'src/properties/props-tyres-services/props-tyre-runFlat.service';
import { PropsTyreReinforceService } from 'src/properties/props-tyres-services/props-tyre-reinforce.service';
import { PropsTyreParamsService } from 'src/properties/props-tyres-services/props-tyre-params.service';
import { PropsModelService } from 'src/properties/props-tyres-services/props-tyre-model.service';
import { PropsTyreLoadIndexService } from 'src/properties/props-tyres-services/props-tyre-loadIndex.service';
import { PropsTyreHomologationService } from 'src/properties/props-tyres-services/props-tyre-homologation.service';
import { PropsTyreHeightService } from 'src/properties/props-tyres-services/props-tyre-height.service';
import { PropsTyrDiametrService } from 'src/properties/props-tyres-services/props-tyre-diameter.service';
import { PropsTyreDemoService } from 'src/properties/props-tyres-services/props-tyre-demo.service';
import { PropsTyreCountryService } from 'src/properties/props-tyres-services/props-tyre-country.service';

@Injectable()
export class UploaderService extends PriceParserTyresOptions {
  constructor( 
    private categoryService: CategorysService,
    private tyresservice: TyresService,
    private supplierService: SuppliersService,
    private stockTyresService: StockTyresService,
    private priceTyreService: PriceTyresService,
    private stockWheelService: StockWheelsService,
    private priceWheelService: PriceWheelsService,
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




  ) {super()}

  create(createUploaderDto: CreateUploaderDto) {
    return 'This action adds a new uploader';
  }

  async parseTyresPrice(path: string) {
    
    try {
      
      fs.readFile(join(process.cwd(), path),
      (err, data) =>{
        if (err) {
          throw err;   
        }

        const parser = new XMLParser(this.optionsTyresParse);
        let jsObj = parser.parse(data);
           
         jsObj.xml.items.item.map(priceItem => {
          //console.log('POSITION', priceItem)
          this.categoryService.createCategoryFromPrice(
            priceItem.price_list_type
          )
          this.supplierService.createSupplierFromPrice(
            priceItem.provider_id, 
            priceItem.provider, 
            priceItem.city, 
            priceItem.city_ua
          )
          this.tyresservice.createTyresFromPrice(
            priceItem.id, 
            priceItem.full_name, 
            priceItem.photo_url,
            priceItem.update_date, 
            priceItem.brand_id,
            priceItem.model_id 
          )
          this.stockTyresService.createStockTyreFromPrice(
            priceItem.id,
            priceItem.in_stock,
            priceItem.provider_id
          )
          this.priceTyreService.createPriceTyresFromPrice(
            priceItem.id,
            priceItem.user_price_wholesale,
            priceItem.user_price,
            priceItem.user_delivery_price,
            priceItem.user_price_plus_user_delivery_price,
            priceItem.provider_id,
            priceItem.update_date,
          )
          this.propsBrandService.createTyreBrandFromPrice(
            priceItem.id, 
            priceItem.brand_id, 
            priceItem.brand
          )       
          this.propsTyreCountry.createTyreCountryFromPrice(
            priceItem.id,
            priceItem.country_manufacturer,
            priceItem.country_manufacturer_ua
          )
          this.propsTyreDemo.createTyreDemoFromPrice(
            priceItem.id,
            priceItem.demo,
          )
          this.propsTyreDiameter.createTyreDiameterFromPrice(
            priceItem.id,
            priceItem.diameter,
          )
          this.propsTyreHeight.createTyreHeightFromPrice(
            priceItem.id,
            priceItem.height,
          )
          this.propsTyreHomologation.createTyreHomologationFromPrice(
            priceItem.id,
            priceItem.homologation,
          )
          this.propsTyreLoadIndex.createLoadIndexFromPrice(
            priceItem.id,
            priceItem.load_index,
            priceItem.load_index_with_desc
          )
          this.propsTyreModel.createTyreModelFromPrice(
            priceItem.id,
            priceItem.model_id,
            priceItem.model
          )
          this.propsTyreParams.createParamsFromPrice(
            priceItem.id,
            priceItem.params,
          )
          this.propsTyreReinforce.createTyreReinforceFromPrice(
            priceItem.id,
            priceItem.reinforce,
          )
          this.propsTyreRunFlat.createTyreRunFlatFromPrice(
            priceItem.id,
            priceItem.run_flat
          )
          this.propsTyreSeal.createTyreSealFromPrice(
            priceItem.id,
            priceItem.seal
          )
          this.propsTyreSeason.createTyreSeasonFromPrice(
            priceItem.id,
            priceItem.season_id,
            priceItem.season,
            priceItem.season_ua
          )
          this.propsTyreSilent.createTyreSilentFromPrice(
            priceItem.id,
            priceItem.silent
          )
          this.propsTyreSizeDigits.createTyreSizeDigitsFromPrice(
            priceItem.id,
            priceItem.size_only_digits
          )
          this.propsTyreSpeedIndex.createTyreSpeedIndexFromPrice(
            priceItem.id,
            priceItem.speed_index,
            priceItem.speed_index_with_desc
          )
          this.propsTyreStudded.createTyreStuddedFromPrice(
            priceItem.id,
            priceItem.studded
          )
          this.propsTyreVehicleType.createTyreVehicleTypeFromPrice(
            priceItem.id,
            priceItem.vehicle_type_id,
            priceItem.vehicle_type,
            priceItem.vehicle_type_ua,
          )
          this.propsTyreWidth.createTyreWidthFromPrice(
            priceItem.id,
            priceItem.width,
          )
          this.propsTyreYear.createTyreYearFromPrice(
            priceItem.id,
            priceItem.manufacture_year
          )
          
          }

        );
   
      }   
       
    );
       
    } catch (error) {
      
      return {'Some Problems with Upload': error}
    }
    
   }  

  findAll() {
    return `This action returns all uploader`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploader`;
  }

  update(id: number, updateUploaderDto: UpdateUploaderDto) {
    return `This action updates a #${id} uploader`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploader`;
  }
}
