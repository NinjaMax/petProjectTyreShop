import { Model } from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";
export declare class WheelPcd extends Model<WheelPcd, WheelPropsConfigAttr> {
    id_pcd: number;
    pcd: string;
    wheels: Wheel[];
}
