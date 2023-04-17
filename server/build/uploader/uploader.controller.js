var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Header, } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
import { diskStorage } from 'multer';
let UploaderController = class UploaderController {
    constructor(uploaderService) {
        this.uploaderService = uploaderService;
    }
    uploadTyreFileAndPassValidation(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.uploaderService.parseTyresPrice(file.path, file.filename);
        });
    }
    uploadWheelsFileAndPassValidation(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.uploaderService.parseWheelsPrice(file.path, file.filename);
        });
    }
    findAll() {
        return this.uploaderService.findAll();
    }
    findOne(id) {
        return this.uploaderService.findOne(+id);
    }
    update(id, updateUploaderDto) {
        return this.uploaderService.update(+id, updateUploaderDto);
    }
    remove(id) {
        return this.uploaderService.remove(+id);
    }
};
__decorate([
    Post('/tyres'),
    Header('Content-Type', 'multipart/form-data'),
    Header('Accept-Charset', 'utf-8'),
    UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload_prices',
            filename: (req, file, cb) => {
                if (!file.mimetype.includes('csv')) {
                    throw "not supported format";
                }
                const fileName = file.originalname;
                const newFileName = fileName;
                cb(null, `${newFileName}`);
            },
        })
    })),
    __param(0, UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 15000000 }),
            new FileTypeValidator({ fileType: 'csv' }),
        ]
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploaderController.prototype, "uploadTyreFileAndPassValidation", null);
__decorate([
    Post('/wheels'),
    Header('Content-Type', 'multipart/form-data'),
    Header('Accept-Charset', 'utf-8'),
    UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './upload_prices',
            filename: (res, file, cb) => {
                if (!file.mimetype.includes('csv')) {
                    throw "Not supported format";
                }
                const fileName = file.originalname;
                const newFileName = fileName;
                cb(null, `${newFileName}`);
            },
        })
    })),
    __param(0, UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 15000000 }),
            new FileTypeValidator({ fileType: 'csv' }),
        ]
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploaderController.prototype, "uploadWheelsFileAndPassValidation", null);
__decorate([
    Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UploaderController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploaderController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateUploaderDto]),
    __metadata("design:returntype", void 0)
], UploaderController.prototype, "update", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UploaderController.prototype, "remove", null);
UploaderController = __decorate([
    Controller('uploader'),
    __metadata("design:paramtypes", [UploaderService])
], UploaderController);
export { UploaderController };
