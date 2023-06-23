import { PartialType } from '@nestjs/mapped-types';
import { CreateTyreDto } from './create-tyre.dto';

export class UpdateTyreDto extends PartialType(CreateTyreDto) {
  //readonly id_tyres: number;
  readonly id: number;
  readonly id_goods_provider: number;
  readonly full_name: string;
  readonly photo_url: string;
  readonly update_date: Date;
}
