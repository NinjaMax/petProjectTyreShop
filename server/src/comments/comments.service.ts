import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentDto } from './dto/get-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comments } from './entities/comment.model';
import { OrdersSuppliersService } from '../orders-suppliers/orders-suppliers.service';
import { OrdersService } from '../orders/orders.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments) private commentsRepository: typeof Comments,
    private ordersService: OrdersService,
    private orderSuppliersService: OrdersSuppliersService,
    private usersService: UsersService,
  ) {}

  async createComment(createCommentDto: CreateCommentDto) {
    try {
      const user = await this.usersService.findUserById(createCommentDto);
      const order = await this.ordersService.findOrderById(createCommentDto);
      const orderSup = await this.orderSuppliersService.findOrderSupById(
        createCommentDto,
      );

      if (user && order) {
        const commentOrder = await this.commentsRepository.create(
          createCommentDto,
        );
        await user.$add('comments', [commentOrder.id_comment]);
        await order.$add('comments', [commentOrder.id_comment]);

        user.comments.push(commentOrder);
        order.comments.push(commentOrder);

        return commentOrder;
      }

      if (user && orderSup) {
        const commentOrderSup = await this.commentsRepository.create(
          createCommentDto,
        );
        await user.$add('comments', [commentOrderSup.id_comment]);
        await orderSup.$add('comments', [commentOrderSup.id_comment]);
        user.comments.push(commentOrderSup);
        order.comments.push(commentOrderSup);

        return commentOrderSup;
      }
      return new HttpException(
        `Data user "User ID or Order ID" is incorrect or not found`,
        HttpStatus.NOT_FOUND,
      );
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllComments() {
    try {
      const commentsAll = await this.commentsRepository.findAll({
        include: { all: true },
      });

      return commentsAll;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCommentById(getCommentDto: GetCommentDto) {
    try {
      const commentId = await this.commentsRepository.findByPk(
        getCommentDto.id_comment,
        { include: { all: true } },
      );

      return commentId;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCommentByOrderId(getCommentDto: GetCommentDto) {
    try {
      const commentByOrderId = await this.commentsRepository.findAll({
        where: { id_order: getCommentDto.id_order },
        include: { all: true },
      });
      //if (commentByOrderId) {
        return commentByOrderId;
      // } else {
      //   return null;
      // }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async removeComment(getCommentDto: GetCommentDto) {
    try {
      const commentRemove = await this.commentsRepository.destroy({
        where: { id_comment: getCommentDto.id_comment },
      });

      return commentRemove;
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
