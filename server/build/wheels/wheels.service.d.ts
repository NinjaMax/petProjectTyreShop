import { CreateWheelDto } from './dto/create-wheel.dto';
import { GetWheelDto } from './dto/get-wheel.dto';
import { UpdateWheelDto } from './dto/update-wheel.dto';
import { Wheel } from './entities/wheel.model';
export declare class WheelsService {
    private wheelRepository;
    constructor(wheelRepository: typeof Wheel);
    createWheel(createWheelDto: CreateWheelDto): Promise<Wheel>;
    createWheelFromPrice(id: number, full_name: string, full_name_color: string, full_name_hotline: string, photo_url: string, update_date: Date): Promise<Wheel>;
    findAllWheels(): Promise<Wheel[]>;
    findWheelById(getWheelDto: GetWheelDto): Promise<Wheel>;
    findWheelOne(getWheelDto: GetWheelDto): Promise<Wheel>;
    findWheelByIdPrice(id: number): Promise<Wheel>;
    update(id: number, updateWheelDto: UpdateWheelDto): string;
    removeWheel(getWheelDto: GetWheelDto): Promise<number>;
}
