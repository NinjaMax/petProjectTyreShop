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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './entities/comment.model';
import { OrdersSuppliersService } from '../orders-suppliers/orders-suppliers.service';
import { OrdersService } from '../orders/orders.service';
import { UsersService } from '../users/users.service';
let CommentsService = class CommentsService {
    constructor(commentsRepository, ordersService, orderSuppliersService, usersService) {
        this.commentsRepository = commentsRepository;
        this.ordersService = ordersService;
        this.orderSuppliersService = orderSuppliersService;
        this.usersService = usersService;
    }
    createComment(createCommentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.usersService.findUserById(createCommentDto);
                const order = yield this.ordersService.findOrderById(createCommentDto);
                const orderSup = yield this.orderSuppliersService.findOrderSupById(createCommentDto);
                if (user && order) {
                    const commentOrder = yield this.commentsRepository.create(createCommentDto);
                    yield user.$add('comments', [commentOrder.id_comment]);
                    yield order.$add('comments', [commentOrder.id_comment]);
                    user.comments.push(commentOrder);
                    order.comments.push(commentOrder);
                    return commentOrder;
                }
                if (user && orderSup) {
                    const commentOrderSup = yield this.commentsRepository.create(createCommentDto);
                    yield user.$add('comments', [commentOrderSup.id_comment]);
                    yield orderSup.$add('comments', [commentOrderSup.id_comment]);
                    user.comments.push(commentOrderSup);
                    order.comments.push(commentOrderSup);
                    return commentOrderSup;
                }
                return new HttpException(`Data user "User ID or Order ID" is incorrect or not found`, HttpStatus.NOT_FOUND);
                ;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentsAll = yield this.commentsRepository.findAll({ include: { all: true } });
                return commentsAll;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    findCommentById(getCommentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentId = yield this.commentsRepository.findByPk(getCommentDto.id_comment, { include: { all: true } });
                return commentId;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
    update(id, updateCommentDto) {
        return `This action updates a #${id} comment`;
    }
    removeComment(getCommentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentRemove = yield this.commentsRepository.destroy({ where: { id_comment: getCommentDto.id_comment } });
                return commentRemove;
            }
            catch (_a) {
                throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);
            }
        });
    }
};
CommentsService = __decorate([
    Injectable(),
    __param(0, InjectModel(Comments)),
    __metadata("design:paramtypes", [Object, OrdersService,
        OrdersSuppliersService,
        UsersService])
], CommentsService);
export { CommentsService };
