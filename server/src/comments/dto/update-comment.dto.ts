import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    readonly id_comment: number;
    readonly comments: string;
    readonly id_user: number;
    readonly id_order: number;
    readonly id_order_sup: number;
    readonly id_sale: number;
    readonly id_tyre: number;
    readonly id_wheel: number;
    readonly id_oil: number;
    readonly id_battery: number;
}
