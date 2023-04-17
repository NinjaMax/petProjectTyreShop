import { WheelsService } from './wheels.service';
import { CreateWheelDto } from './dto/create-wheel.dto';
import { GetWheelDto } from './dto/get-wheel.dto';
import { UpdateWheelDto } from './dto/update-wheel.dto';
export declare class WheelsController {
    private readonly wheelsService;
    constructor(wheelsService: WheelsService);
    create(createWheelDto: CreateWheelDto): Promise<import("./entities/wheel.model").Wheel>;
    findAll(): Promise<import("./entities/wheel.model").Wheel[]>;
    findOne(getWheelDto: GetWheelDto): Promise<import("./entities/wheel.model").Wheel>;
    update(id: string, updateWheelDto: UpdateWheelDto): string;
    remove(getWheelDto: GetWheelDto): Promise<number>;
}
