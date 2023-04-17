import { PartialType } from '@nestjs/mapped-types';
import { LoginDto } from './logIn-dto';
export class UpdateAuthDto extends PartialType(LoginDto) {
}
