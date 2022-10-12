import { PartialType } from '@nestjs/mapped-types';
import { CreateStockTyresDto } from './create-stock_tyres.dto';

export class UpdateStockTyresDto extends PartialType(CreateStockTyresDto) {
    
    stock: number;
    update_date: Date;

}
