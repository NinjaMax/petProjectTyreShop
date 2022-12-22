import { Controller, Get, Post, Body, Patch, Param, Delete,
  UploadedFile, UseInterceptors, ParseFilePipe, MaxFileSizeValidator,
   FileTypeValidator,
   ParseFilePipeBuilder,
   HttpStatus,
   Header, } from '@nestjs/common';
import { Express } from 'express';
import { UploaderService } from './uploader.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
import { diskStorage } from 'multer';
import { XMLParser } from 'fast-xml-parser';
import { readFile } from 'fs';
import * as fs from 'fs';
import { DEFAULT_ENCODING } from 'crypto';

@Controller('uploader')
export class UploaderController {
  constructor(private readonly uploaderService: UploaderService) {}

  @Post()
  @Header('Content-Transfer-Encoding', 'none')
  @UseInterceptors(FileInterceptor( 'file', {
    storage: diskStorage({
      destination: './downloads',
      filename: (req, file, cb) => {

        if(file.mimetype.indexOf('xml')) {
          file.mimetype = 'xml'
          file.encoding = 'utf-8'
        }
        
        const fileName: string = file.originalname;
        const newFileName: string = fileName;
        cb(null, `${newFileName}`)
      }, 
      
    })
  } 
  ))
  async uploadFileAndPassValidation(
    @Body() body: CreateUploaderDto, 
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: 'xml' }),
        ]
      })

    ) file: Express.Multer.File,
  )
  {
    //let xmlFile: string;
    fs.readFile('./downloads/' + file.originalname, 'utf-8',(err, data: Buffer) => {

      if (err) throw err;
      //console.log("XMLFILE" + data.toString('utf-8'));
      //const xmlFile: string = data.toString('utf-8', 3, data.length );
      console.log(data);
      //console.log(xmlFile);

      const alwaysArray = [
        "xml.items.item",
      ];
      
      const options = {
        ignoreAttributes : false,
        ignorePiTags: true,
        ignoreDeclaration: true,
        alwaysCreateTextNode: false,
        removeNSPrefix: true,
        //preserveOrder: true,
        processEntities: true,
        format: true,
        numberParseOptions: {
          leadingZeros: true,
          hex: true,
          skipLike: /\+[0-9]{10}/
        },
        item:  "xml.items.item",
        isArray: (item: string) => { 
          if( alwaysArray.indexOf(item) !== -1) return true;
        }
      };
    
      const parser = new XMLParser(options);
      let jsonObj = parser.parse(`${data}`);
      let neWjsonObj = JSON.stringify(jsonObj, null);
      
      console.log(neWjsonObj);     
      //const newData: string = data.toString('utf-8');

      //return xmlFile;
    })

    //console.log(xmlFile);

    // const options = {
    //   ignoreAttributes : false
    // };
  
    // const parser = new XMLParser(options);
    // let jsonObj = parser.parse(`${xmlFile}`);

    //console.log( jsonObj);

    return { body, file: file,};
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
