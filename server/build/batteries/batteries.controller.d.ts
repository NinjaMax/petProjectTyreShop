import { BatteriesService } from './batteries.service';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { GetBatteryDto } from './dto/get-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';
export declare class BatteriesController {
    private readonly batteriesService;
    constructor(batteriesService: BatteriesService);
    create(createBatteryDto: CreateBatteryDto): Promise<import("./entities/battery.model").Battery>;
    findAll(): Promise<import("./entities/battery.model").Battery[]>;
    findOne(getBatteryDto: GetBatteryDto): Promise<import("./entities/battery.model").Battery>;
    update(id: number, updateBatteryDto: UpdateBatteryDto): string;
    remove(getBatteryDto: GetBatteryDto): Promise<number>;
}
