import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdersSupplierDto } from './create-orders-supplier.dto';

export class UpdateOrdersSupplierDto extends PartialType(CreateOrdersSupplierDto) {}
