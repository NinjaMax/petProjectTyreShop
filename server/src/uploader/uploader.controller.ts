import { Controller, Get, Post, Body, Patch, Param, Delete,
  UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator,
   FileTypeValidator,
   ParseFilePipeBuilder,
   HttpStatus,
   Header,
   PipeTransform,
   UsePipes,
   StreamableFile,
   Req,
   Res, } from '@nestjs/common';
import { Express, urlencoded } from 'express';
import { UploaderService } from './uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
import { diskStorage } from 'multer';
import { XMLParser } from 'fast-xml-parser';
import { createReadStream, readFile } from 'fs';
import * as fs from 'fs';
//import { Readable } from 'stream';
import { TransformDataPipe } from './uploaderPipe';
import iconv from 'iconv-lite';
import { join } from 'path';
import { request } from 'https';


@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @Post()
  @Header('Content-Type', 'multipart/form-data')
  @Header('Accept-Charset', 'utf-8')
  @UseInterceptors(FileInterceptor( 'file', 
    {
      storage: diskStorage({
        destination: './downloads',
        filename: (req, file, cb) => {

          if(file.mimetype.indexOf('xml')) {
            file.mimetype = 'xml'
          
            //file.encoding = 'utf-8'
          }
          console.log('interceptor:', JSON.stringify(req.body));
        
          const fileName: string = file.originalname;
          const newFileName: string = fileName;
          cb(null, `${newFileName}`)
        }, 
      
      })
    } 
  ))
  @UsePipes(new TransformDataPipe()) 
  async uploadFileAndPassValidation(
    @Body() body: CreateUploaderDto, 
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 15000000 }),
          new FileTypeValidator({ fileType: 'xml' }),
        ]
      }),

    ) file: Express.Multer.File,
    
  )
  {    
  //   console.log(body);
  //   function streamFileGet(): StreamableFile {
  //   const streamData = createReadStream('./downloads/' + file.originalname, 'utf-8'); 
    
  //   streamData.on('dataStream', (dataStream) => {
      
  //     console.log(dataStream);

  //   })
  //   streamData.on('end', () => console.log('done'));
  //   streamData.on('error', (err) => { console.error(err); })
  //     //const newXML = streamData.setEncoding('utf-8');
  //     //console.log(newXML);
      
  //     return new StreamableFile(streamData);
  //     // console.log("XMLFILE" + streamData.toString('utf-8'));
  // }  

  //     console.log(streamFileGet());
      // //const dataUTF = iconv.decode(Buffer.from(data), 'utf-8');
      // const xmlFile: string = streamData.toString( 'utf-8');
      
      // //console.log(dataUTF);
      // console.log('ReadFile', JSON.stringify(xmlFile));
    

      // const alwaysArray = [
      //   "xml.items.item",
      // ];
      
      // const options = {
      //   ignoreAttributes : false,
      //   ignorePiTags: true,
      //   ignoreDeclaration: true,
      //   alwaysCreateTextNode: false,
      //   removeNSPrefix: true,
      //   //preserveOrder: true,
      //   processEntities: true,
      //   format: true,
      //   numberParseOptions: {
      //     leadingZeros: true,
      //     hex: true,
      //     skipLike: /\+[0-9]{10}/
      //   },
      //   item:  "xml.items.item",
      //   isArray: (item: string) => { 
      //     if( alwaysArray.indexOf(item) !== -1) return true;
      //   }
      // };
    
      // const parser = new XMLParser(options);
      // let jsonObj =  parser.parse(`${data}`);
      // let neWjsonObj = JSON.stringify(jsonObj, null);
      
      // console.log(neWjsonObj);     
    

    return { 'price has already uploaded': body, file: file};
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



