import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentDto } from './dto/get-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comments } from './entities/comment.entity';

@Injectable()
export class CommentsService {

  constructor(@InjectModel(Comments) private commentsRepository: typeof Comments, 
  ) {}

  async createComment(createCommentDto: CreateCommentDto) {

    try {
      
      const comment = await this.commentsRepository.create(createCommentDto);

      return comment;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllComments() {

    try {
      
      const commentsAll = await this.commentsRepository.findAll({include: {all: true}});

      return commentsAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findCommentById(getCommentDto: GetCommentDto) {

    try {
      
      const commentId = await this.commentsRepository.findByPk(getCommentDto.id_comment, {include: {all: true}});

      return commentId;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async removeComment(getCommentDto: GetCommentDto) {

    try {
      
      const commentRemove = await this.commentsRepository.destroy({where: {id_comment: getCommentDto.id_comment}});

      return commentRemove;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}
