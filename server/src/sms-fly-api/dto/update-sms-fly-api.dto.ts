import { PartialType } from '@nestjs/mapped-types';
import { CreateSmsFlyApiDto } from './create-sms-fly-api.dto';

export class UpdateSmsFlyApiDto extends PartialType(CreateSmsFlyApiDto) {}
