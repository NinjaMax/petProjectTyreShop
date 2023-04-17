import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
import { UploaderPaprserService } from './uploaderParser.service';
export declare class UploaderService {
    private uploaderParser;
    constructor(uploaderParser: UploaderPaprserService);
    create(createUploaderDto: CreateUploaderDto): string;
    parseTyresPrice(path: string, fileName: string): Promise<string>;
    parseWheelsPrice(path: string, fileName: string): Promise<string>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateUploaderDto: UpdateUploaderDto): string;
    remove(id: number): string;
}
