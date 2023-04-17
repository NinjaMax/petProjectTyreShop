import { CreateBatteryDto } from './create-battery.dto';
declare const UpdateBatteryDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBatteryDto>>;
export declare class UpdateBatteryDto extends UpdateBatteryDto_base {
    readonly id: number;
    readonly full_name: string;
}
export {};
