import { PartialType } from '@nestjs/mapped-types';
import { CreatePayviewDto } from './create-payview.dto';

export class UpdatePayviewDto extends PartialType(CreatePayviewDto) {}
