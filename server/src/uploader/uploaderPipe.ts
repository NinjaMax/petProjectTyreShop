import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TransformDataPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value.encoding = 'utf-8';

    return value;
  }
}