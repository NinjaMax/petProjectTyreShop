var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentDto } from './dto/get-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    create(createCommentDto) {
        return this.commentsService.createComment(createCommentDto);
    }
    findAll() {
        return this.commentsService.findAllComments();
    }
    findOne(getCommentDto) {
        return this.commentsService.findCommentById(getCommentDto);
    }
    update(id, updateCommentDto) {
        return this.commentsService.update(+id, updateCommentDto);
    }
    remove(getCommentDto) {
        return this.commentsService.removeComment(getCommentDto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "create", null);
__decorate([
    Get('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "findAll", null);
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetCommentDto]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "findOne", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateCommentDto]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "update", null);
__decorate([
    Delete('/remove'),
    __param(0, Param()),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetCommentDto]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "remove", null);
CommentsController = __decorate([
    Controller('comments'),
    __metadata("design:paramtypes", [CommentsService])
], CommentsController);
export { CommentsController };