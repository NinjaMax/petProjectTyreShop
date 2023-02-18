import { Injectable,  HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import * as csvParser from 'csv-parser';
import { ItemPriceTyresConfigAttr } from './interfaces/priceItemTyre.interface';
import { AddTyresToDbService } from './addTyresToDataBase.service';
import { ItemPriceWheelConfigAttr } from './interfaces/priceItemWheel.interface';
import { AddWheelsToDbService } from './addWheelToDataBase.service';

@Injectable()
export class UploaderPaprserService {
  constructor(
    private addTyresToDataBase: AddTyresToDbService,
    private addWheelToDataBase: AddWheelsToDbService
    
  ) {}
  
  async csvParserTyres(path: string) {

    try {
      const results = [];
      fs.createReadStream(join(process.cwd(), path))
      .pipe(csvParser())
      .on('data', (data) => {results.push(data)})
      .on('error', (error) => {
        if(error) {console.log("PARSER ERROR: ", error)}})
      .on('end', () => {
        results.forEach((item: ItemPriceTyresConfigAttr) => {  
            this.addTyresToDataBase.addTyresToDb(item);
          });
      });

      return `Price File ${path} has been succeeded, parse and added to Database`
        
    } catch {
        
     throw new HttpException('Some Problems with Upload and Parce price', HttpStatus.SERVICE_UNAVAILABLE);
        
    } 
  }

  async csvParserWheels(path: string) {

    try {
      
      const results = [];
      fs.createReadStream(join(process.cwd(), path))
      .pipe(csvParser())
      .on('data', (data) => {results.push(data)})
      .on('error', (error) => {
        if(error) {console.log("PARSER ERROR: ", error)}})
      .on('end', () => {
        results.forEach((item: ItemPriceWheelConfigAttr) => {  
            this.addWheelToDataBase.addWheelsToDb(item);
          });
      });
        
      return `Price File ${path} has been succeeded, parse and added to Database`
         
    } catch {
        
      throw new HttpException('Some Problems with Upload and Parce price', HttpStatus.SERVICE_UNAVAILABLE);
        
    } 
  }
 }



