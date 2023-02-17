import { Injectable,  HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import csvParser from 'csv-parser';
import stripBom from 'strip-bom-stream'; 
//import { PriceParserTyresOptions } from './interfaces/priceParserTyres.interface';
import { ItemPriceTyresConfigAttr } from './interfaces/priceItemTyre.interface';
import { Parser } from 'node-expat';
import { AddTyresToDbService } from './addTyresToDataBase.service';
import { ItemPriceWheelConfigAttr } from './interfaces/priceItemWheel.interface';
import { AddWheelsToDbService } from './addWheelToDataBase.service';



@Injectable()
export class UploaderPaprserService {
  constructor(
    private addTyresToDataBase: AddTyresToDbService,
    private addWheelToDataBase: AddWheelsToDbService
    
  ) {}
  
  async xmlParserTyres(path: string) {

    try {
      //let itemByte: number = 9000;
      const resultData = [];
      fs.createReadStream(join(process.cwd(), path)
      //{highWaterMark: itemByte}
      //{start: 0, end: name}
      )
      .pipe(stripBom())
      .pipe(csvParser())
      .on('data', (data) => {resultData.push(data)})
      .on('error', (error) => console.log("PARSER ERROR: ", error))
      .on('end', () => {
        console.log(resultData);
        // [
        //   { NAME: 'Daffy Duck', AGE: '24' },
        //   { NAME: 'Bugs Bunny', AGE: '22' }
        // ]
      });

      //streamFile.on('open', () => {
      
      //});


      // const items = [];
      // let item = [[]];
      // let startTag: number;
      // let endTag: number;

      // const xmlStream = new Parser('UTF-8');
      //stream.read
      // stream.pipe(xmlStream);

      // xmlStream.on('startElement', function (name) {
      //   item.push([name]);

      //    if(name.toString() =='item') {
      //   //   //items.push(Object.fromEntries(item));
      //     startTag = Buffer.byteLength(item.toString());
      //   //   console.log(Buffer.byteLength(item.toString()));
      //   //   //console.log(Buffer.byteLength(name));
      //   //   console.log(name + " Start tag");
      //    }
      //   //console.log(Buffer.byteLength(item.toString()));
      //   //console.log(Buffer.byteLength(name));
      //   //console.log(name);
      // });
  
      // xmlStream.on('text', function (text) {    
      //   item[item.length - 1].push(text.toString());    
      // });
  
      // xmlStream.on('endElement', (name) => { 
  
      //   if(name.toString() =='item') {
      //     items.push(Object.fromEntries(item));
      //     endTag = Buffer.byteLength(item.toString());
          
      //     let rangeItem = endTag - startTag;
          
      //     if( 9000 - endTag < rangeItem) {
      //         itemByte = 9000 + rangeItem;
      //       } else {
      //         itemByte = 9000;
      //       }
      //     //console.log(endTag - startTag);
      //     //itemByte = Buffer.byteLength(item.toString()) + 5;
      //     //console.log(Buffer.byteLength(item.toString()));
      //     //console.log(Buffer.byteLength(name));
      //     //console.log(name + " END tag"); 

      //   }
        
      //   if(name.toString() =='xml') {
  
      //     items.forEach((item: ItemPriceTyresConfigAttr) => {  
      //       this.addTyresToDataBase.addTyresToDb(item);
      //         //console.log('ITEM ID', items);
      //         //console.log('ITEM ID');
      //     });
          
      //   } 
            
      // });
        
      // xmlStream.on('error', function (error) {
      //   console.error(error);
      // });

      // xmlStream.on('end', function () {
      //   console.log('XML END');
      // });
        
      //streamFile.on('end', ()=> console.log('STREAM END'));
        
        //return `Price File ${path} has been succeeded upload, parse and added to Database`
      
        
    } catch {
        
      throw new HttpException('Some Problems with Upload and Parce price', HttpStatus.BAD_REQUEST);
        
    } 
  }

  async xmlParserWheels(path: string) {

    try {
      let itemByte: number = 10000;
      const stream = fs.createReadStream(join(process.cwd(), path),
      {highWaterMark: itemByte});

        const items = [];
        let item = [[]];
        let startTag: number;
        let endTag: number;

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
          endTag = Buffer.byteLength(item.toString());
          
          let rangeItem = endTag - startTag;
          
          if(10000 - endTag < rangeItem) {
              itemByte = 10000 + rangeItem;
            } else {
              itemByte = 10000;
            }
        }
         
        if(name.toString() =='xml') {
  
          items.forEach((item: ItemPriceWheelConfigAttr) => {  
            this.addWheelToDataBase.addWheelsToDb(item);
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



