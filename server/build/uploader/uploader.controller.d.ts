/// <reference types="multer" />
import { UploaderService } from './uploader.service';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
export declare class UploaderController {
    private readonly uploaderService;
    constructor(uploaderService: UploaderService);
    uploadTyreFileAndPassValidation(file: Express.Multer.File): Promise<string>;
    uploadWheelsFileAndPassValidation(file: Express.Multer.File): Promise<string>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateUploaderDto: UpdateUploaderDto): string;
    remove(id: string): string;
}
