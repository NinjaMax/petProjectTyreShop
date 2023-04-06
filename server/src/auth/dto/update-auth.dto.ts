import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './user-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
