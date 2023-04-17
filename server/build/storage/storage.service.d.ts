import { CreateStorageDto } from './dto/create-storage.dto';
import { GetStorageDto } from './dto/get-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { Storage } from './entities/storage.model';
export declare class StorageService {
    private storageRepository;
    constructor(storageRepository: typeof Storage);
    createStorage(createStorageDto: CreateStorageDto): Promise<Storage>;
    findAllStorage(): Promise<Storage[]>;
    findAllStorageStock(): Promise<Storage[]>;
    findStorageById(getStorageDto: GetStorageDto): Promise<Storage>;
    findStorageByIdOrder(getStorageDto: GetStorageDto): Promise<Storage>;
    update(id: number, updateStorageDto: UpdateStorageDto): string;
    removeStorage(getStorageDto: GetStorageDto): Promise<number>;
}
