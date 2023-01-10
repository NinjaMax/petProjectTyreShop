import { Injectable,  HttpException, HttpStatus } from '@nestjs/common';
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
//import { StockWheelsService } from 'src/stock/stock-wheels.service';
//import { PriceWheelsService } from 'src/prices/price-wheels.service';
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
    //private stockWheelService: StockWheelsService,
    //private priceWheelService: PriceWheelsService,
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
        //for( let i:number = 0; i < jsObj.xml.items.item.length; i++) {
        jsObj.xml.items.item.forEach((item) => {
            
          
          //console.log('POSITION', priceItem)
          //for( let i:number = 0; i < jsObj.xml.items.item.length; i++) {
          //this.parceAddtoDb(jsObj.xml.items.item[i]);
          this.parceAddtoDb(item);
          //     this.categoryService.createCategoryFromPrice(
          //      arr[index].price_list_type
          //  )
        
          //   this.categoryService.createCategoryFromPrice(
          //     jsObj.xml.items.item[index].price_list_type
          // )
          
          // this.supplierService.createSupplierFromPrice(
          //   jsObj.xml.items.item[i].provider_id, 
          //   jsObj.xml.items.item[i].provider, 
          //   jsObj.xml.items.item[i].city, 
          //   jsObj.xml.items.item[i].city_ua
          // )
          //}
          //)
        //}
          

          // this.categoryService.createCategoryFromPrice(
          //   priceItem.price_list_type
          // )
          // this.supplierService.createSupplierFromPrice(
          //   priceItem.provider_id, 
          //   priceItem.provider, 
          //   priceItem.city, 
          //   priceItem.city_ua
          // )
          // this.propsBrandService.createTyreBrandFromPrice(
          //   priceItem.id, 
          //   priceItem.brand_id, 
          //   priceItem.brand
          // ) 
          // this.propsTyreModel.createTyreModelFromPrice(
          //   priceItem.id,
          //   priceItem.model_id,
          //   priceItem.model
          // )
          // this.propsTyreCountry.createTyreCountryFromPrice(
          //   priceItem.id,
          //   priceItem.country_manufacturer,
          //   priceItem.country_manufacturer_ua
          // )
          // this.propsTyreDemo.createTyreDemoFromPrice(
          //   priceItem.id,
          //   priceItem.demo,
          // )
          // this.propsTyreDiameter.createTyreDiameterFromPrice(
          //   priceItem.id,
          //   priceItem.diameter,
          // )
          // this.propsTyreHeight.createTyreHeightFromPrice(
          //   priceItem.id,
          //   priceItem.height,
          // )
          // this.propsTyreHomologation.createTyreHomologationFromPrice(
          //   priceItem.id,
          //   priceItem.homologation,
          // )
          // this.propsTyreLoadIndex.createLoadIndexFromPrice(
          //   priceItem.id,
          //   priceItem.load_index,
          //   priceItem.load_index_with_desc
          // )
         
          // this.propsTyreParams.createParamsFromPrice(
          //   priceItem.id,
          //   priceItem.params,
          // )
          // this.propsTyreReinforce.createTyreReinforceFromPrice(
          //   priceItem.id,
          //   priceItem.reinforce,
          // )
          // this.propsTyreRunFlat.createTyreRunFlatFromPrice(
          //   priceItem.id,
          //   priceItem.run_flat
          // )
          // this.propsTyreSeal.createTyreSealFromPrice(
          //   priceItem.id,
          //   priceItem.seal
          // )
          // this.propsTyreSeason.createTyreSeasonFromPrice(
          //   priceItem.id,
          //   priceItem.season_id,
          //   priceItem.season,
          //   priceItem.season_ua
          // )
          // this.propsTyreSilent.createTyreSilentFromPrice(
          //   priceItem.id,
          //   priceItem.silent
          // )
          // this.propsTyreSizeDigits.createTyreSizeDigitsFromPrice(
          //   priceItem.id,
          //   priceItem.size_only_digits
          // )
          // this.propsTyreSpeedIndex.createTyreSpeedIndexFromPrice(
          //   priceItem.id,
          //   priceItem.speed_index,
          //   priceItem.speed_index_with_desc
          // )
          // this.propsTyreStudded.createTyreStuddedFromPrice(
          //   priceItem.id,
          //   priceItem.studded
          // )
          // this.propsTyreVehicleType.createTyreVehicleTypeFromPrice(
          //   priceItem.id,
          //   priceItem.vehicle_type_id,
          //   priceItem.vehicle_type,
          //   priceItem.vehicle_type_ua,
          // )
          // this.propsTyreWidth.createTyreWidthFromPrice(
          //   priceItem.id,
          //   priceItem.width,
          // )
          // this.propsTyreYear.createTyreYearFromPrice(
          //   priceItem.id,
          //   priceItem.manufacture_year
          // )
          // this.tyresservice.createTyresFromPrice(
          //   priceItem.id, 
          //   priceItem.full_name, 
          //   priceItem.photo_url,
          //   priceItem.update_date,
          //   priceItem.brand_id,
          //   priceItem.model_id,
          //   priceItem.price_list_type 
          // )
           // this.stockTyresService.createStockTyreFromPrice(
          //   priceItem.id,
          //   priceItem.in_stock,
          //   priceItem.provider_id
          // )
          // this.priceTyreService.createPriceTyresFromPrice(
          //   priceItem.id,
          //   priceItem.user_price_wholesale,
          //   priceItem.user_price,
          //   priceItem.user_delivery_price,
          //   priceItem.user_price_plus_user_delivery_price,
          //   priceItem.provider_id,
          //   priceItem.update_date,
          // )
          
         }

        );
   
      }   
       
    );

    return `Price File ${path} has been succeeded upload`
       
    } catch {
      
      throw new HttpException('Some Problems with Upload and Parce price', HttpStatus.BAD_REQUEST);
      
    }
    
  }  
  //{ price_list_type: string; provider_id: number; provider: string; city: string; city_ua: string; id: number; brand_id: number; brand: string; model_id: number; model: string; country_manufacturer: string; country_manufacturer_ua: string; demo: string; diameter: number; height: number; homologation: string; load_index: string; load_index_with_desc: string; params: string; reinforce: string; run_flat: string; seal: string; season_id: number; season: string; season_ua: string; silent: string; size_only_digits: number; speed_index: string; speed_index_with_desc: string; studded: string; vehicle_type_id: number; vehicle_type: string; vehicle_type_ua: string; width: number; manufacture_year: number; full_name: string; photo_url: string; update_date: Date; in_stock: number; user_price_wholesale: number; user_price: number; user_delivery_price: number; user_price_plus_user_delivery_price: number; }
  async parceAddtoDb(item) {

    await this.tyresservice.createTyresFromPrice(
      item.id, 
      item.full_name, 
      item.photo_url,
      item.update_date,
      
    )
   
    await this.categoryService.createCategoryFromPrice(
      item.id,
      item.price_list_type
    )
    
    await this.supplierService.createSupplierFromPrice(
      item.provider_id, 
      item.provider, 
      item.city, 
      item.city_ua
    )

    await this.propsBrandService.createTyreBrandFromPrice(
      item.id, 
      item.brand_id, 
      item.brand
    ) 
    await this.propsTyreModel.createTyreModelFromPrice(
      item.id,
      item.model_id,
      item.model
    )
    await this.propsTyreCountry.createTyreCountryFromPrice(
      item.id,
      item.country_manufacturer,
    item.country_manufacturer_ua
    )
    await this.propsTyreDemo.createTyreDemoFromPrice(
      item.id,
      item.demo,
    )
    // this.propsTyreDiameter.createTyreDiameterFromPrice(
    //   item.id,
    //   item.diameter,
    // )
    // this.propsTyreHeight.createTyreHeightFromPrice(
    //   item.id,
    //   item.height,
    // )
    // this.propsTyreHomologation.createTyreHomologationFromPrice(
    //   item.id,
    //   item.homologation,
    // )
    // this.propsTyreLoadIndex.createLoadIndexFromPrice(
    //   item.id,
    //   item.load_index,
    //   item.load_index_with_desc
    // )
   
    // this.propsTyreParams.createParamsFromPrice(
    //   item.id,
    //   item.params,
    // )
    // this.propsTyreReinforce.createTyreReinforceFromPrice(
    //   item.id,
    //   item.reinforce,
    // )
    // this.propsTyreRunFlat.createTyreRunFlatFromPrice(
    //   item.id,
    //   item.run_flat
    // )
    // this.propsTyreSeal.createTyreSealFromPrice(
    //   item.id,
    //   item.seal
    // )
    // this.propsTyreSeason.createTyreSeasonFromPrice(
    //   item.id,
    //   item.season_id,
    //   item.season,
    //   item.season_ua
    // )
    // this.propsTyreSilent.createTyreSilentFromPrice(
    //   item.id,
    //   item.silent
    // )
    // this.propsTyreSizeDigits.createTyreSizeDigitsFromPrice(
    //   item.id,
    //   item.size_only_digits
    // )
    // this.propsTyreSpeedIndex.createTyreSpeedIndexFromPrice(
    //   item.id,
    //   item.speed_index,
    //   item.speed_index_with_desc
    // )
    // this.propsTyreStudded.createTyreStuddedFromPrice(
    //   item.id,
    //   item.studded
    // )
    // this.propsTyreVehicleType.createTyreVehicleTypeFromPrice(
    //   item.id,
    //   item.vehicle_type_id,
    //   item.vehicle_type,
    //   item.vehicle_type_ua,
    // )
    // this.propsTyreWidth.createTyreWidthFromPrice(
    //   item.id,
    //   item.width,
    // )
    // this.propsTyreYear.createTyreYearFromPrice(
    //   item.id,
    //   item.manufacture_year
    // )
  
    //  this.stockTyresService.createStockTyreFromPrice(
    //   item.id,
    //   item.in_stock,
    //   item.provider_id
    // )
    // this.priceTyreService.createPriceTyresFromPrice(
    //   item.id,
    //   item.user_price_wholesale,
    //   item.user_price,
    //   item.user_delivery_price,
    //   item.user_price_plus_user_delivery_price,
    //   item.provider_id,
    //   item.update_date,
    // )
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
