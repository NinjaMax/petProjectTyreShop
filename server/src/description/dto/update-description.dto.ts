import { PartialType } from '@nestjs/mapped-types';
import { CreateDescriptionDto } from './create-description.dto';

export class UpdateDescriptionDto extends PartialType(CreateDescriptionDto) {
  readonly id_description: number;
  readonly description: string;
}
