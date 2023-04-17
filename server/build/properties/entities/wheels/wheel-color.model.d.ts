import { Model } from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";
export declare class WheelColor extends Model<WheelColor, WheelPropsConfigAttr> {
    id_color: string;
    color: string;
    color_short: string;
    wheels: Wheel[];
}
