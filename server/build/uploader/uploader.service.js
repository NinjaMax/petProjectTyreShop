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
import { UploaderPaprserService } from './uploaderParser.service';
let UploaderService = class UploaderService {
    constructor(uploaderParser) {
        this.uploaderParser = uploaderParser;
    }
    create(createUploaderDto) {
        return 'This action adds a new uploader';
    }
    parseTyresPrice(path, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.uploaderParser.csvParserTyres(path);
                return `Price File ${fileName} has been succeeded upload`;
            }
            catch (_a) {
                throw new HttpException('Some Problems with Upload and Parce price', HttpStatus.SERVICE_UNAVAILABLE);
            }
        });
    }
    parseWheelsPrice(path, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.uploaderParser.csvParserWheels(path);
                return `Price File ${fileName} has been succeeded upload`;
            }
            catch (_a) {
                throw new HttpException('Some Problems with Upload and Parce price', HttpStatus.SERVICE_UNAVAILABLE);
            }
        });
    }
    findAll() {
        return `This action returns all uploader`;
    }
    findOne(id) {
        return `This action returns a #${id} uploader`;
    }
    update(id, updateUploaderDto) {
        return `This action updates a #${id} uploader`;
    }
    remove(id) {
        return `This action removes a #${id} uploader`;
    }
};
UploaderService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UploaderPaprserService])
], UploaderService);
export { UploaderService };
