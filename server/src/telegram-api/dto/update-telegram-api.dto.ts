import { PartialType } from '@nestjs/mapped-types';
import { CreateTelegramApiDto } from './create-telegram-api.dto';

export class UpdateTelegramApiDto extends PartialType(CreateTelegramApiDto) {}
