import { Injectable,  HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
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
      let itemByte = 9000;
      
      const stream = fs.createReadStream(join(process.cwd(), path),
      {highWaterMark: itemByte}
      //{start: 0, end: name}
      );

      const items = [];
      let item = [[]];
      let startTag;
      let endTag;

      const xmlStream = new Parser('UTF-8');
      stream.read
      stream.pipe(xmlStream);

      xmlStream.on('startElement', function (name) {
        item.push([name]);

         if(name.toString() =='item') {
        //   //items.push(Object.fromEntries(item));
          startTag = Buffer.byteLength(item.toString());
        //   console.log(Buffer.byteLength(item.toString()));
        //   //console.log(Buffer.byteLength(name));
        //   console.log(name + " Start tag");
         }
        //console.log(Buffer.byteLength(item.toString()));
        //console.log(Buffer.byteLength(name));
        //console.log(name);
      });
  
      xmlStream.on('text', function (text) {    
        item[item.length - 1].push(text.toString());    
      });
  
      xmlStream.on('endElement', (name) => { 
  
        if(name.toString() =='item') {
          items.push(Object.fromEntries(item));
          //if( < 1269) {
            endTag = Buffer.byteLength(item.toString())
          //} else {
          //  itemByte = 9000;
          //}
          console.log(endTag - startTag);
          //itemByte = Buffer.byteLength(item.toString()) + 5;
          //console.log(Buffer.byteLength(item.toString()));
          //console.log(Buffer.byteLength(name));
          console.log(name + " END tag");
        }
        
        if(name.toString() =='xml') {
  
          items.forEach((item: ItemPriceTyresConfigAttr) => {  
            //this.addTyresToDataBase.addTyresToDb(item);
              //console.log('ITEM ID', item);
              //console.log('ITEM ID');
          });
          
        } 
            
      });
        
      xmlStream.on('error', function (error) {
        console.error(error);
      });

      xmlStream.on('end', function () {
        console.log('XML END');
      });
        
      stream.on('end', ()=> console.log('STREAM END'));
        
        //return `Price File ${path} has been succeeded upload, parse and added to Database`
         
    } catch {
        
      throw new HttpException('Some Problems with Upload and Parce price', HttpStatus.BAD_REQUEST);
        
    } 
  }

  async xmlParserWheels(path: string) {

    try {
      
      const stream = fs.createReadStream(join(process.cwd(), path),
      {highWaterMark: 10000});

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



