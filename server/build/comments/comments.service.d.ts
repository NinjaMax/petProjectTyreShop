import { HttpException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentDto } from './dto/get-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comments } from './entities/comment.model';
import { OrdersSuppliersService } from '../orders-suppliers/orders-suppliers.service';
import { OrdersService } from '../orders/orders.service';
import { UsersService } from '../users/users.service';
export declare class CommentsService {
    private commentsRepository;
    private ordersService;
    private orderSuppliersService;
    private usersService;
    constructor(commentsRepository: typeof Comments, ordersService: OrdersService, orderSuppliersService: OrdersSuppliersService, usersService: UsersService);
    createComment(createCommentDto: CreateCommentDto): Promise<Comments | HttpException>;
    findAllComments(): Promise<Comments[]>;
    findCommentById(getCommentDto: GetCommentDto): Promise<Comments>;
    update(id: number, updateCommentDto: UpdateCommentDto): string;
    removeComment(getCommentDto: GetCommentDto): Promise<number>;
}
