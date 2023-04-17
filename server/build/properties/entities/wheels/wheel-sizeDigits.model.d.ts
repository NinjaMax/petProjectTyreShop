import { Model } from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";
export declare class WheelSizeDigits extends Model<WheelSizeDigits, WheelPropsConfigAttr> {
    id_size_digits: number;
    size_only_digits: string;
    wheels: Wheel[];
}
