import { Controller, Get, Post, Body, Patch, Param, Delete,
  UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator,
   FileTypeValidator,
   ParseFilePipeBuilder,
   HttpStatus, } from '@nestjs/common';
import { Express } from 'express';
import { UploaderService } from './uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';

@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @Post()
  @UseInterceptors(FileInterceptor( 'file'))
  uploadFileAndPassValidation(
    @Body() body: CreateUploaderDto, 
    @UploadedFile(
      // new ParseFilePipe({
      //   validators: [
      //     new MaxFileSizeValidator({ maxSize: 10000000 }),
      //     new FileTypeValidator({ fileType: 'xml' }),
      //   ]
      //   }) 
      // )
      // file: Express.Multer.File,
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: 'file/xml',
      })
      .addMaxSizeValidator({
        maxSize: 10000000
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }),
      
    ) file: Express.Multer.File,
    ) 
  {
    return { body, file: file, };
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
  update(@Param('id') id: string, @Body() updateUploaderDto: UpdateUploaderDto) {
    return this.uploaderService.update(+id, updateUploaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploaderService.remove(+id);
  }
}
