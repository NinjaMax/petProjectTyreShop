import { Model } from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";
export declare class WheelBoltCountPcd extends Model<WheelBoltCountPcd, WheelPropsConfigAttr> {
    id_bolt_count_pcd: number;
    bolt_count_pcd: string;
    wheels: Wheel[];
}
