import { PartialType } from '@nestjs/mapped-types';
import { CreatePaytypeDto } from './create-paytype.dto';

export class UpdatePaytypeDto extends PartialType(CreatePaytypeDto) {}
