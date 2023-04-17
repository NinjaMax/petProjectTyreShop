import { Model } from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";
export declare class WheelBrand extends Model<WheelBrand, WheelPropsConfigAttr> {
    id_brand: number;
    brand: string;
    wheels: Wheel[];
}
