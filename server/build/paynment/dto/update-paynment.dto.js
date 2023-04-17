import { PartialType } from '@nestjs/mapped-types';
import { CreatePaynmentDto } from './create-paynment.dto';
export class UpdatePaynmentDto extends PartialType(CreatePaynmentDto) {
}
