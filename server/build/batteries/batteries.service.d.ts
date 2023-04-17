import { CreateBatteryDto } from './dto/create-battery.dto';
import { GetBatteryDto } from './dto/get-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';
import { Battery } from './entities/battery.model';
export declare class BatteriesService {
    private batteryRepository;
    constructor(batteryRepository: typeof Battery);
    createBattery(createBatteryDto: CreateBatteryDto): Promise<Battery>;
    findAllBatteries(): Promise<Battery[]>;
    findBatteryById(getBatteryDto: GetBatteryDto): Promise<Battery>;
    update(id: number, updateBatteryDto: UpdateBatteryDto): string;
    removeBattery(getBatteryDto: GetBatteryDto): Promise<number>;
}
