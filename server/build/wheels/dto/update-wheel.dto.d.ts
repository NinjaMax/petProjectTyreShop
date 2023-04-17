import { CreateWheelDto } from './create-wheel.dto';
declare const UpdateWheelDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateWheelDto>>;
export declare class UpdateWheelDto extends UpdateWheelDto_base {
    readonly id: number;
    readonly id_wheel: number;
    readonly full_name: string;
}
export {};
