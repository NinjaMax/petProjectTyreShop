import { Injectable,  HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import { PriceParserTyresOptions } from './interfaces/priceParserTyres.interface';
import { ItemPriceTyresConfigAttr } from './interfaces/priceItemTyre.interface';
import { Parser } from 'node-expat';
import { XmlStream } from 'xml-stream';
import {RdfXmlParser} from "rdfxml-streaming-parser";
import { XmlReader } from 'xml-reader'
import { AddTyresToDbService } from './addTyresToDataBase.service';
import { CategorysService } from 'src/categorys/categorys.service';
import { TyresService } from 'src/tyres/tyres.service';
import { PriceTyresService } from 'src/prices/price-tyres.service';
import { PropsBrandService } from 'src/properties/props-tyres-services/props-tyre-brand.service';
import { PropsTyreCountryService } from 'src/properties/props-tyres-services/props-tyre-country.service';
import { PropsTyreDemoService } from 'src/properties/props-tyres-services/props-tyre-demo.service';
import { PropsTyrDiametrService } from 'src/properties/props-tyres-services/props-tyre-diameter.service';
import { PropsTyreHeightService } from 'src/properties/props-tyres-services/props-tyre-height.service';
import { PropsTyreHomologationService } from 'src/properties/props-tyres-services/props-tyre-homologation.service';
import { PropsTyreLoadIndexService } from 'src/properties/props-tyres-services/props-tyre-loadIndex.service';
import { PropsModelService } from 'src/properties/props-tyres-services/props-tyre-model.service';
import { PropsTyreParamsService } from 'src/properties/props-tyres-services/props-tyre-params.service';
import { PropsTyreReinforceService } from 'src/properties/props-tyres-services/props-tyre-reinforce.service';
import { PropsTyreRunFlatService } from 'src/properties/props-tyres-services/props-tyre-runFlat.service';
import { PropsTyreSealService } from 'src/properties/props-tyres-services/props-tyre-seal.service';
import { PropsTyreSeasonService } from 'src/properties/props-tyres-services/props-tyre-season.service';
import { PropsTyreSilentService } from 'src/properties/props-tyres-services/props-tyre-silent.service';
import { PropsTyreSizeDigitsService } from 'src/properties/props-tyres-services/props-tyre-sizeDigits.service';
import { PropsTyreSpeedIndexService } from 'src/properties/props-tyres-services/props-tyre-speedIndex.service';
import { PropsTyreStuddedService } from 'src/properties/props-tyres-services/props-tyre-studded.service';
import { PropsTyreVehicleTypeService } from 'src/properties/props-tyres-services/props-tyre-vehicleType.service';
import { PropsTyreWidthService } from 'src/properties/props-tyres-services/props-tyre-width.service';
import { PropsTyreYearService } from 'src/properties/props-tyres-services/props-tyre-year.service';
import { StockTyresService } from 'src/stock/stock-tyres.service';
import { SuppliersService } from 'src/suppliers/suppliers.service';


@Injectable()
export class UploaderPaprserService {
  constructor(
    protected addTyresToDataBase: AddTyresToDbService,
    protected categoryService: CategorysService,
    protected tyresservice: TyresService,
    protected supplierService: SuppliersService,
    protected stockTyresService: StockTyresService,
    protected priceTyreService: PriceTyresService,
    protected propsBrandService: PropsBrandService,
    protected propsTyreCountry: PropsTyreCountryService,
    protected propsTyreDemo: PropsTyreDemoService,
    protected propsTyreDiameter: PropsTyrDiametrService,
    protected propsTyreHeight: PropsTyreHeightService,
    protected propsTyreHomologation: PropsTyreHomologationService,
    protected propsTyreLoadIndex: PropsTyreLoadIndexService,
    protected propsTyreModel: PropsModelService,
    protected propsTyreParams: PropsTyreParamsService,
    protected propsTyreReinforce: PropsTyreReinforceService,
    protected propsTyreRunFlat: PropsTyreRunFlatService,
    protected propsTyreSeal: PropsTyreSealService,
    protected propsTyreSeason: PropsTyreSeasonService,
    protected propsTyreSilent: PropsTyreSilentService,
    protected propsTyreSizeDigits: PropsTyreSizeDigitsService,
    protected propsTyreSpeedIndex: PropsTyreSpeedIndexService,
    protected propsTyreStudded: PropsTyreStuddedService,
    protected propsTyreVehicleType: PropsTyreVehicleTypeService,
    protected propsTyreWidth: PropsTyreWidthService,
    protected propsTyreYear: PropsTyreYearService,
  ) {
    
  }
  
  parserTyres(path: string) {

    try {
      
      const stream = fs.createReadStream(join(process.cwd(), path));

        const items = [];
        let item = [[]];

        const xmlStream = new Parser('UTF-8');
  
      stream.pipe(xmlStream);
      xmlStream.on('startElement', function (name) {
  
        item.push([name]);
  
      });
  
      xmlStream.on('text', function (text) {
          
        item[item.length - 1].push(text.toString());
          
      });
  
        xmlStream.on('endElement', (name) => { 
  
            if(name.toString() =='item') {
  
                items.push(Object.fromEntries(item));
  
            }
         
            if(name.toString() =='xml') {
  
                items.forEach((item) => {
                
                this.addTyresToDataBase.addTyresToDb(item);
                //console.log('ITEM ID', item);
              
                });
          
            } 
            
        });
        
        xmlStream.on('error', function (error) {
            console.error(error);
        });

        xmlStream.on('end', function () {
          console.log('END XML');
        });
        
        stream.on('end', ()=> console.log('END'));
        
        //return `Price File ${path} has been succeeded upload, parse and added to Database`
         
    } catch {
        
      throw new HttpException('Some Problems with Upload and Parce price', HttpStatus.BAD_REQUEST);
        
    } 
  }
}



