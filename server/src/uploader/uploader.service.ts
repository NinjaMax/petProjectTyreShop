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
import { XmlReader } from 'xml-reader';
import { UploaderPaprserService } from './uploaderParser.service';



@Injectable()
export class UploaderService {
  constructor( 
    private uploaderParser: UploaderPaprserService,
  ) {}

  create(createUploaderDto: CreateUploaderDto) {
    return 'This action adds a new uploader';
  }

  async parseTyresPrice(path: string) {
    
    try {

      this.uploaderParser.parserTyres(path);

      return `Price File ${path} has been succeeded upload, parse and added to Database`
       
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
