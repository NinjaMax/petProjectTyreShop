import { PartialType } from '@nestjs/mapped-types';
import { CreateStockDto } from './create-stock.dto';

export class UpdateStockDto extends PartialType(CreateStockDto) {
    
    readonly stock: number;
    readonly reserve: number;
    readonly remainder: number;
    //readonly id_tyres: number;
    readonly id_wheel: number;
    readonly id_oil: number;
    readonly id_battery: number;
    readonly update_date: Date;

}
