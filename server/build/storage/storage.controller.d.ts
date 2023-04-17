import { StorageService } from './storage.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { GetStorageDto } from './dto/get-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    create(createStorageDto: CreateStorageDto): Promise<import("./entities/storage.model").Storage>;
    findAllStorage(): Promise<import("./entities/storage.model").Storage[]>;
    findAllStorageStock(): Promise<import("./entities/storage.model").Storage[]>;
    findOne(getStorageDto: GetStorageDto): Promise<import("./entities/storage.model").Storage>;
    update(id: string, updateStorageDto: UpdateStorageDto): string;
    remove(getStorageDto: GetStorageDto): Promise<number>;
}
