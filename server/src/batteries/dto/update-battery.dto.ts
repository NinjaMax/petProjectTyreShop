import { PartialType } from '@nestjs/mapped-types';
import { CreateBatteryDto } from './create-battery.dto';

export class UpdateBatteryDto extends PartialType(CreateBatteryDto) {

    readonly id: number;
    readonly full_name: string;

}
