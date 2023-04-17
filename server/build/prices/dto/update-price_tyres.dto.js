import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceDto } from './create-price.dto';
export class UpdatePriceTyresDto extends PartialType(CreatePriceDto) {
}
