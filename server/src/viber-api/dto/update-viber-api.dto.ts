import { PartialType } from '@nestjs/mapped-types';
import { CreateViberApiDto } from './create-viber-api.dto';

export class UpdateViberApiDto extends PartialType(CreateViberApiDto) {}
