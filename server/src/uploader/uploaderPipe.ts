import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TransformDataPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    
    return value;
  }
}