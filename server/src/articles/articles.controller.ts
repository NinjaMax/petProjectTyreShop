import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
//import { join } from 'path';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.createArticle(createArticleDto);
  }

  @Post('/upload-image')
  @Header('Content-Type', 'multipart/form-data')
  //@Header('Accept-Charset', 'utf-8')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/imageArticle',
        filename: ( req, file, cb) => {
          //try {
          if (
            !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)
            // !file.mimetype.includes('image/jpeg') ||
            // !file.mimetype.includes('image/png')
          ) {
            new Error('Invalid. not supported format')
          }
          const fileName: string = file.originalname;
          const newFileName: string = fileName;
          cb(null, `${newFileName}`)
        },
      })
    } 
  ))
  async uploadTyreFileAndPassValidation(
    //@Body() body: CreateUploaderDto, 
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 15000000 }),
          new FileTypeValidator({ fileType: 'image/jpeg|image/png'}),
          //new FileTypeValidator({ fileType: /\.(jpg|jpeg|png)$/}),
        ]
      })
    )
    file: Express.Multer.File,
  ) {
    return {
      path: file.destination, 
      name: file.filename
    };
  }

  @Get('/all')
  findAll() {
    return this.articlesService.findAllArticles();
  }
  
  @Get('/all-limit')
  findAllArticlesLimit(
    @Query('limit') limit: string,
    @Query('offset') offset: string
  ) {
    return this.articlesService.findAllArticlesLimit(+limit, +offset);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findArticlesById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.updateArticles(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.removeArticle(+id);
  }
}
