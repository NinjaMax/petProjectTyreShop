var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';
import csvParser from 'csv-parser';
import { AddTyresToDbService } from './addTyresToDataBase.service';
import { AddWheelsToDbService } from './addWheelToDataBase.service';
let UploaderPaprserService = class UploaderPaprserService {
    constructor(addTyresToDataBase, addWheelToDataBase) {
        this.addTyresToDataBase = addTyresToDataBase;
        this.addWheelToDataBase = addWheelToDataBase;
    }
    csvParserTyres(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = [];
                fs.createReadStream(join(process.cwd(), path))
                    .pipe(csvParser())
                    .on('data', (data) => { results.push(data); })
                    .on('error', (error) => {
                    if (error) {
                        console.log("PARSER ERROR: ", error);
                    }
                })
                    .on('end', () => {
                    results.forEach((item) => {
                        this.addTyresToDataBase.addTyresToDb(item);
                    });
                });
                return `Price File ${path} has been succeeded, parse and added to Database`;
            }
            catch (_a) {
                throw new HttpException('Some Problems with Upload and Parce price', HttpStatus.SERVICE_UNAVAILABLE);
            }
        });
    }
    csvParserWheels(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const results = [];
                fs.createReadStream(join(process.cwd(), path))
                    .pipe(csvParser())
                    .on('data', (data) => { results.push(data); })
                    .on('error', (error) => {
                    if (error) {
                        console.log("PARSER ERROR: ", error);
                    }
                })
                    .on('end', () => {
                    results.forEach((item) => {
                        this.addWheelToDataBase.addWheelsToDb(item);
                    });
                });
                return `Price File ${path} has been succeeded, parse and added to Database`;
            }
            catch (_a) {
                throw new HttpException('Some Problems with Upload and Parce price', HttpStatus.SERVICE_UNAVAILABLE);
            }
        });
    }
};
UploaderPaprserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AddTyresToDbService,
        AddWheelsToDbService])
], UploaderPaprserService);
export { UploaderPaprserService };
