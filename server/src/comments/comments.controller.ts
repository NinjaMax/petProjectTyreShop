import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentDto } from './dto/get-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.createComment(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAllComments();
  }

  @Get('/id')
  findOne(@Param() @Body() getCommentDto: GetCommentDto) {
    return this.commentsService.findCommentById(getCommentDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete('/remove')
  remove(@Param() @Body() getCommentDto: GetCommentDto) {
    return this.commentsService.removeComment(getCommentDto);
  }
}
