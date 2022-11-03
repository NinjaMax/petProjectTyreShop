import { PartialType } from '@nestjs/mapped-types';
import { CreateBatteryDto } from './create-battery.dto';

export class UpdateBatteryDto extends PartialType(CreateBatteryDto) {

    readonly id_battery: number;
    readonly full_name: string;

}
