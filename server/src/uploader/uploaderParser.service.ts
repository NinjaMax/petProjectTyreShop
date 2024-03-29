import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import csvParser from 'csv-parser';
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
      let resultsTyre: any[] = [];
      fs.createReadStream(join(process.cwd(), path))
        .pipe(
          csvParser({
            separator: ';',
            skipComments: true,
          }),
        )
        .on('data', (data: any) => {
          resultsTyre?.push(data);
        })
        .on('error', (error) => {
          if (error) {
            console.log('PARSER ERROR: ', error);
            throw new HttpException(
              'SOME PROBLEM WITH PARSER',
              HttpStatus.BAD_REQUEST,
            );
          }
        })
        .on('end', () => {
          resultsTyre?.forEach((item: ItemPriceTyresConfigAttr) => {
            this.addTyresToDataBase.addTyresToDb(item);
          });
          resultsTyre = null;
        });
      return `Price File ${path} (has been succeeded, parse and added to Database)`;
    } catch (err) {
      throw new HttpException(`${err.message}`, HttpStatus.SERVICE_UNAVAILABLE);
    } 
  }

  async csvParserWheels(path: string) {
    try {
      let resultsWheel: any[] = [];
      fs.createReadStream(join(process.cwd(), path))
        .pipe(
          csvParser({
            separator: ';',
            skipComments: true,
          }))
        .on('data', (data: any) => {
          resultsWheel?.push(data);
        })
        .on('error', (error) => {
          if (error) {
            console.log('PARSER ERROR: ', error);
            throw new HttpException(
              'SOME PROBLEM WITH PARSER',
              HttpStatus.BAD_REQUEST,
            );
          }
        })
        .on('end', () => {
          resultsWheel?.forEach((item: ItemPriceWheelConfigAttr) => {
            this.addWheelToDataBase.addWheelsToDb(item);
          });
          resultsWheel = null;
        });
      return `Price File ${path} has been succeeded, parse and added to Database`;
    } catch (err) {
      throw new HttpException(`${err.message}`, HttpStatus.SERVICE_UNAVAILABLE);
    } 
  }
 }
