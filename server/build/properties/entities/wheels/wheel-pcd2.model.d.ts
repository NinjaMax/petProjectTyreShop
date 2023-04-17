import { Model } from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";
export declare class WheelPcd2 extends Model<WheelPcd2, WheelPropsConfigAttr> {
    id_pcd2: number;
    pcd2: string;
    wheels: Wheel[];
}
