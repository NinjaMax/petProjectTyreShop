import { Injectable,  HttpException, HttpStatus } from '@nestjs/common';
import { CreateUploaderDto } from './dto/create-uploader.dto';
import { UpdateUploaderDto } from './dto/update-uploader.dto';
import { UploaderPaprserService } from './uploaderParser.service';

@Injectable()
export class UploaderService {
  constructor( 
    private uploaderParser: UploaderPaprserService,
  ) {}

  create(createUploaderDto: CreateUploaderDto) {
    return 'This action adds a new uploader';
  }

  async parseTyresPrice(path: string) {
    
    try {

      this.uploaderParser.xmlParserTyres(path);

      return `Price File ${path} has been succeeded upload, parse and added to Database`
       
    } catch {
      
      throw new HttpException('Some Problems with Upload and Parce price', HttpStatus.BAD_REQUEST);
      
    }
    
  }  

  async parseWheelsPrice(path: string) {
    
    try {

      this.uploaderParser.xmlParserWheels(path);

      return `Price File ${path} has been succeeded upload, parse and added to Database`
       
    } catch {
      
      throw new HttpException('Some Problems with Upload and Parce price', HttpStatus.BAD_REQUEST);
      
    }
    
  }  

  findAll() {
    return `This action returns all uploader`;
  }

  findOne(id: number) {
    return `This action returns a #${id} uploader`;
  }

  update(id: number, updateUploaderDto: UpdateUploaderDto) {
    return `This action updates a #${id} uploader`;
  }

  remove(id: number) {
    return `This action removes a #${id} uploader`;
  }
}
