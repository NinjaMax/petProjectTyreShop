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

import {XmlStream} from 'xml-stream';

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
      
      const stream = fs.createReadStream(join(process.cwd(), path));
      stream.on('error',(err) =>{
            if (err) {
              throw err;  
            }
          }
        );
      
      stream.on('data', (data) => {
         // do{
          //if(data) {
            // let chunkCopy = data.toString().slice();
            // //do {
            
            //   let chunkStart = data.toString().indexOf('<item>');
            //   let nextChunk = data.toString().indexOf('</item>');
            //   let chunkEnd = data.toString().indexOf('<item>', nextChunk);
            // //   for(let i = 0; i < data.toString().length; i++){
            //   let chunkCutStart = data.toString().slice(chunkStart);
            //   //let chunkCutEnd = chunkCopy.toString().slice(chunkEnd);
            // //let chunkCut = data.toString().slice(chunkStart, chunkEnd);
            // let chunkCutEnd = chunkCutStart.toString().slice(chunkEnd);
            // //   //let chunk = data.toString().split('</item>');
            //   //let chunk = data.toString().padStart(nextChunk,'</item>');
            //   console.log('CHUNK START:', chunkStart);
            //   console.log('CHUNK NEXT:', nextChunk);
            //   console.log('CHUNK END:', chunkEnd);
            //   console.log('CHUNK PART:', chunkCutEnd);

              // let xmlData = JSON.stringify(data.toString(), ['<item/>'])
              // let newData = JSON.parse(xmlData)
              // //console.log('JSON STRIN', )
              // console.log('JSON PARCE', newData)
            // }
            // }while(data != null);
          //}
        //  
            
          
          

          // const parser = new XMLParser(this.optionsTyresParse);
          // let jsObj = parser.parse(data);
          // console.log( jsObj.xml.items.item);
        
          // // newJSOBJ.forEach((item) => {
          //   jsObj.xml.items.item.forEach((item) => {
          //     this.parceAddtoDb(item);
          //   }
          // );
          //console.timeEnd('End Parser');
        }   
       
      );
      stream.on('end', () => console.log('End Stream Parser'));
    
    return `Price File ${path} has been succeeded upload`
       
    } catch {
      
      throw new HttpException('Some Problems with Upload and Parce price', HttpStatus.BAD_REQUEST);
      
    }
    
  }  
  //{ price_list_type: string; provider_id: number; provider: string; city: string; city_ua: string; id: number; brand_id: number; brand: string; model_id: number; model: string; country_manufacturer: string; country_manufacturer_ua: string; demo: string; diameter: number; height: number; homologation: string; load_index: string; load_index_with_desc: string; params: string; reinforce: string; run_flat: string; seal: string; season_id: number; season: string; season_ua: string; silent: string; size_only_digits: number; speed_index: string; speed_index_with_desc: string; studded: string; vehicle_type_id: number; vehicle_type: string; vehicle_type_ua: string; width: number; manufacture_year: number; full_name: string; photo_url: string; update_date: Date; in_stock: number; user_price_wholesale: number; user_price: number; user_delivery_price: number; user_price_plus_user_delivery_price: number; }
  async parceAddtoDb(item) {

    await this.tyresservice.createTyresFromPrice(
      +item.id, 
      item.full_name, 
      item.photo_url,
      //item.update_date,
      
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
      String(item.model)
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

    await this.propsTyreDiameter.createTyreDiameterFromPrice(
      item.id,
      Number(item.diameter),
    )

     this.propsTyreHeight.createTyreHeightFromPrice(
      item.id,
      Number(item.height),
    )

    await this.propsTyreHomologation.createTyreHomologationFromPrice(
      item.id,
      item.homologation
    )

    await this.propsTyreLoadIndex.createLoadIndexFromPrice(
      item.id,
      String(item.load_index),
      item.load_index_with_desc
    )
   
    await this.propsTyreParams.createParamsFromPrice(
      item.id,
      item.params
    )

    await this.propsTyreReinforce.createTyreReinforceFromPrice(
      item.id,
      item.reinforce,
    )

    await this.propsTyreRunFlat.createTyreRunFlatFromPrice(
      item.id,
      item.run_flat
    )

    await this.propsTyreSeal.createTyreSealFromPrice(
      item.id,
      item.seal
    )

    await this.propsTyreSeason.createTyreSeasonFromPrice(
      item.id,
      item.season_id,
      item.season,
      item.season_ua
    )

    await this.propsTyreSilent.createTyreSilentFromPrice(
      item.id,
      item.silent
    )

    await this.propsTyreSizeDigits.createTyreSizeDigitsFromPrice(
      item.id,
      item.size_only_digits
    )

    await this.propsTyreSpeedIndex.createTyreSpeedIndexFromPrice(
      item.id,
      item.speed_index,
      item.speed_index_with_desc
    )

    await this.propsTyreStudded.createTyreStuddedFromPrice(
      item.id,
      item.studded
    )

    await this.propsTyreVehicleType.createTyreVehicleTypeFromPrice(
      item.id,
      +item.vehicle_type_id,
      item.vehicle_type,
      item.vehicle_type_ua,
    )

    await this.propsTyreWidth.createTyreWidthFromPrice(
      item.id,
      item.width,
    )

    await this.propsTyreYear.createTyreYearFromPrice(
      item.id,
      Number(item.manufacture_year)
    )

    await this.stockTyresService.createStockTyreFromPrice(
      item.id,
      item.in_stock,
      item.provider_id,
      item.update_date,
    )
    await this.priceTyreService.createPriceTyresFromPrice(
      item.id,
      item.user_price_wholesale,
      item.user_price,
      item.user_delivery_price,
      item.user_price_plus_user_delivery_price,
      item.provider_id,
      item.update_date,
    )

    
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
