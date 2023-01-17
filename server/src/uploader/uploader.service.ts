import { Injectable,  HttpException, HttpStatus } from '@nestjs/common';
import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
import * as fs from 'fs';
import { join } from 'path';
import { PriceParserTyresOptions } from './interfaces/priceParserTyres.interface';
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
import { ItemPriceTyresConfigAttr } from './interfaces/priceItemTyre.interface';
import { Parser } from 'node-expat';
import { XmlStream } from 'xml-stream';
import {RdfXmlParser} from "rdfxml-streaming-parser";
import { XmlReader } from 'xml-reader'


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

  
  //{ price_list_type: string; provider_id: number; provider: string; city: string; city_ua: string; id: number; brand_id: number; brand: string; model_id: number; model: string; country_manufacturer: string; country_manufacturer_ua: string; demo: string; diameter: number; height: number; homologation: string; load_index: string; load_index_with_desc: string; params: string; reinforce: string; run_flat: string; seal: string; season_id: number; season: string; season_ua: string; silent: string; size_only_digits: number; speed_index: string; speed_index_with_desc: string; studded: string; vehicle_type_id: number; vehicle_type: string; vehicle_type_ua: string; width: number; manufacture_year: number; full_name: string; photo_url: string; update_date: Date; in_stock: number; user_price_wholesale: number; user_price: number; user_delivery_price: number; user_price_plus_user_delivery_price: number; }
     parceAddtoDb(item: ItemPriceTyresConfigAttr) {

     this.tyresservice.createTyresFromPrice(
      +item.id, 
      item.full_name, 
      item.photo_url,
      //item.update_date,
      
    );
   
     this.categoryService.createCategoryFromPrice(
      item.id,
      item.price_list_type
    );
    
     this.supplierService.createSupplierFromPrice(
      item.provider_id, 
      item.provider,
      item.city, 
      item.city_ua
    );

     this.propsBrandService.createTyreBrandFromPrice(
      item.id, 
      item.brand_id, 
      item.brand
    );

     this.propsTyreModel.createTyreModelFromPrice(
      item.id,
      item.model_id,
      String(item.model)
    );
     this.propsTyreCountry.createTyreCountryFromPrice(
      item.id,
      item.country_manufacturer,
      item.country_manufacturer_ua
    );
     this.propsTyreDemo.createTyreDemoFromPrice(
      item.id,
      item.demo,
    );

     this.propsTyreDiameter.createTyreDiameterFromPrice(
      item.id,
      Number(item.diameter),
    );

     this.propsTyreHeight.createTyreHeightFromPrice(
      item.id,
      Number(item.height),
    );

     this.propsTyreHomologation.createTyreHomologationFromPrice(
      item.id,
      item.homologation
    );

     this.propsTyreLoadIndex.createLoadIndexFromPrice(
      item.id,
      String(item.load_index),
      item.load_index_with_desc
    );
   
     this.propsTyreParams.createParamsFromPrice(
      item.id,
      item.params
    );

     this.propsTyreReinforce.createTyreReinforceFromPrice(
      item.id,
      item.reinforce,
    );

    this.propsTyreRunFlat.createTyreRunFlatFromPrice(
      item.id,
      item.run_flat
    );

     this.propsTyreSeal.createTyreSealFromPrice(
      item.id,
      item.seal
    );

     this.propsTyreSeason.createTyreSeasonFromPrice(
      item.id,
      item.season_id,
      item.season,
      item.season_ua
    );

     this.propsTyreSilent.createTyreSilentFromPrice(
      item.id,
      item.silent
    );

     this.propsTyreSizeDigits.createTyreSizeDigitsFromPrice(
      item.id,
      item.size_only_digits
    );

     this.propsTyreSpeedIndex.createTyreSpeedIndexFromPrice(
      item.id,
      item.speed_index,
      item.speed_index_with_desc
    );

     this.propsTyreStudded.createTyreStuddedFromPrice(
      item.id,
      item.studded
    );

     this.propsTyreVehicleType.createTyreVehicleTypeFromPrice(
      item.id,
      +item.vehicle_type_id,
      item.vehicle_type,
      item.vehicle_type_ua,
    );

     this.propsTyreWidth.createTyreWidthFromPrice(
      item.id,
      item.width,
    );

     this.propsTyreYear.createTyreYearFromPrice(
      item.id,
      Number(item.manufacture_year)
    );

     this.stockTyresService.createStockTyreFromPrice(
      item.id,
      item.in_stock,
      item.provider_id,
      item.update_date,
    );
     this.priceTyreService.createPriceTyresFromPrice(
      item.id,
      item.user_price_wholesale,
      item.user_price,
      item.user_delivery_price,
      item.user_price_plus_user_delivery_price,
      item.provider_id,
      item.update_date,
    );

    return  'Price added to DATA BASE';

  }

  async parseTyresPrice(path: string) {
    
    try {

      let items = [];
      let item = [[]];

      const stream = fs.createReadStream(join(process.cwd(), path))

      const xmlStream = new Parser('UTF-8');

      stream.pipe(xmlStream);
      xmlStream.on('startElement', function (name) {

        item.push([name]);

      });

      xmlStream.on('text', function (text) {
        
        // if(!text.toString()) {
        //   item[item.length - 1].push('Null');
        //  } else {
          item[item.length - 1].push(text.toString());
        //}
        
      });

      xmlStream.on('endElement', function (name) { 

        if(name.toString() =='item') {

          items.push(Object.fromEntries(item));

        }
       
        if(name.toString() =='xml') {

         console.log('END ELEMENT', items);

          items.forEach((item) => {
            this.parceAddtoDb(item);
          }
          );

          console.log('Adding to database completed.')
        } 
      });

      xmlStream.on('error', function (error) {
        console.error(error);
      });
      
      xmlStream.on('end', function () {
        console.log('END XML');
      });
    
    return `Price File ${path} has been succeeded upload`
       
    } catch {
      
      throw new HttpException('Some Problems with Upload and Parce price', HttpStatus.BAD_REQUEST);
      
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

// function parceAddtoDb(entity: any): void {
//   throw new Error('Function not implemented.');
// }

