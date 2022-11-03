import { PartialType } from '@nestjs/mapped-types';
import { CreateStockDto } from './create-stock_tyres.dto';

export class UpdateStockTyresDto extends PartialType(CreateStockDto) {
    
    readonly stock: number;
    readonly id_tyres: number;
    readonly id_wheel: number;
    readonly id_oil: number;
    readonly id_battery: number;
    readonly update_date: Date;

}
