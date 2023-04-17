import { Model } from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";
export declare class WheelWidth extends Model<WheelWidth, WheelPropsConfigAttr> {
    id_width: number;
    width: string;
    wheels: Wheel[];
}
