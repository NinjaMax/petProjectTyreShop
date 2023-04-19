import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Header,
} from '@nestjs/common';
import { Express } from 'express';
import { UploaderService } from './uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';
//import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
import { diskStorage } from 'multer';

@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService,
  ) {}

  @Post('/tyres')
  @Header('Content-Type', 'multipart/form-data')
  @Header('Accept-Charset', 'utf-8')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload_prices',
        filename: (req, file, cb) => {
          if (!file.mimetype.includes('csv')) {
            throw 'not supported format';
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
          new FileTypeValidator({ fileType: 'csv' }),
        ]
      })
    )
    file: Express.Multer.File,
  ) {    
    return await this.uploaderService.parseTyresPrice(file.path, file.filename);
  }

  @Post('/wheels')
  @Header('Content-Type', 'multipart/form-data')
  @Header('Accept-Charset', 'utf-8')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload_prices',
        filename: (res, file, cb) => {
          if (!file.mimetype.includes('csv')) {
            throw 'Not supported format';
          }

          const fileName: string = file.originalname;
          const newFileName: string = fileName;
          cb(null, `${newFileName}`)
        },
      })
    } 
  ))
  async uploadWheelsFileAndPassValidation(
    //@Body() body: CreateUploaderDto, 
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 15000000 }),
          new FileTypeValidator({ fileType: 'csv' }),
        ]
      })
    )
    file: Express.Multer.File,
  ) {
    return await this.uploaderService.parseWheelsPrice(
      file.path,
      file.filename,
    );
  }

  @Get()
  findAll() {
    return this.uploaderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploaderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUploaderDto: UpdateUploaderDto,
  ) {
    return this.uploaderService.update(+id, updateUploaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploaderService.remove(+id);
  }
}



