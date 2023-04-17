import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { GetCommentDto } from './dto/get-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createCommentDto: CreateCommentDto): Promise<import("./entities/comment.model").Comments | import("@nestjs/common").HttpException>;
    findAll(): Promise<import("./entities/comment.model").Comments[]>;
    findOne(getCommentDto: GetCommentDto): Promise<import("./entities/comment.model").Comments>;
    update(id: string, updateCommentDto: UpdateCommentDto): string;
    remove(getCommentDto: GetCommentDto): Promise<number>;
}
