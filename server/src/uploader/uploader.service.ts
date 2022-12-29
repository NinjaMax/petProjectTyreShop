import { Injectable } from '@nestjs/common';
import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
import * as fs from 'fs';
import { join } from 'path';
import { PriceParserTyresOptions } from './interfaces/priceParserTyres.interface';
import { XMLParser } from 'fast-xml-parser';
//import { Tyres } from 'src/tyres/entities/tyres.model';
import { TyresService } from 'src/tyres/tyres.service';

@Injectable()
export class UploaderService extends PriceParserTyresOptions {
  constructor( 
    private tyresservice: TyresService,





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
          console.log('POSITION', priceItem)
          this.tyresservice.createTyresFromPrice(
            priceItem.id, 
            priceItem.full_name, 
            priceItem.update_date, 
            priceItem.brand_id,
            priceItem.model_id )
          
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
