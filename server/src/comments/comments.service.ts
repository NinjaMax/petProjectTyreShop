import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentDto } from './dto/get-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comments } from './entities/comment.model';
import { OrdersSuppliersService } from '../orders-suppliers/orders-suppliers.service';
import { OrdersService } from '../orders/orders.service';
import { UsersService } from '../users/users.service';
import { Users } from 'src/users/entities/users.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments) private commentsRepository: typeof Comments,
    private ordersService: OrdersService,
    private orderSuppliersService: OrdersSuppliersService,
    private usersService: UsersService,
  ) {}

  async createComment(createCommentDto: CreateCommentDto) {
    //try {
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
        const findCommentOrder = await this.commentsRepository.findByPk(
          commentOrder.id_comment,
          { include: { all: true } },
        );

        return findCommentOrder;
      }

      if (user && orderSup) {
        const commentOrderSup = await this.commentsRepository.create(
          createCommentDto,
        );
        await user.$add('comments', [commentOrderSup.id_comment]);
        await orderSup.$add('comments', [commentOrderSup.id_comment]);
        user.comments.push(commentOrderSup);
        orderSup.comments.push(commentOrderSup);
        const findCommentOrderSup = await this.commentsRepository.findByPk(
          commentOrderSup.id_comment,
          { include: { all: true } },
        );

        return findCommentOrderSup;
      }
      return new HttpException(
        `Data user "User ID or Order ID" is incorrect or not found`,
        HttpStatus.NOT_FOUND,
      );
    // } catch {
    //   throw new HttpException(
    //     'Data is incorrect and must be uniq',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }

  async createCommentNew(
    item
    : any
    
   //{
    //id_user: number,
    //comments: string,
    //id_order: number,
    //id_order_sup: number,
   //}
  ) {
    //try {
    const user = await this.usersService.findUserById(item);
    const order = await this.ordersService.findOrderById(item);
    const orderSup = await this.orderSuppliersService.findOrderSupById(item);

      if (user && order) {
        const commentOrder = await this.commentsRepository.create(item);
        await user.$add('comments', [commentOrder.id_comment]);
        await order.$add('comments', [commentOrder.id_comment]);

        user.comments.push(commentOrder);
        order.comments.push(commentOrder);
        const findCommentOrder = await this.commentsRepository.findByPk(
          commentOrder.id_comment,
          { include: { all: true } },
        );

        return findCommentOrder;
      }

      if (user && orderSup) {
        const commentOrderSup:any = await this.commentsRepository.create(item);
        await user.$add('comments', [commentOrderSup.id_comment]);
        await orderSup.$add('comments', [commentOrderSup.id_comment]);
        user.comments.push(commentOrderSup);
        orderSup.comments.push(commentOrderSup);
        const findCommentOrderSup = await this.commentsRepository.findByPk(
          commentOrderSup.id_comment,
          { include: { all: true } },
        );

        return findCommentOrderSup;
      }
      return new HttpException(
        `Data user "User ID or Order ID" is incorrect or not found`,
        HttpStatus.NOT_FOUND,
      );
    // } catch {
    //   throw new HttpException(
    //     'Data is incorrect and must be uniq',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
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
      if (getCommentDto.id_order !== 0) {
        const commentByOrderId = await this.commentsRepository.findAll({
          where: { id_order: getCommentDto.id_order },
          include: [{ model: Users }],
          order: [['createdAt', 'DESC']],
        });
        return commentByOrderId;
      } else {
        return null;
      }
    } catch {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findCommentByOrderSupId(getCommentDto: GetCommentDto) {
    try {
      if (getCommentDto.id_order_sup !== 0) {
        const commentByOrderSupId = await this.commentsRepository.findAll({
          where: { id_order_sup: getCommentDto.id_order_sup },
          include: { all: true },
        });
        return commentByOrderSupId;
      } else {
        return null;
      }
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
