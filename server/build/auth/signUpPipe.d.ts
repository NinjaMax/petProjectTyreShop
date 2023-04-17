import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { SignupDto } from './dto/signUp-dto';
export declare class SignupPipe implements PipeTransform {
    transform(value: unknown, _metadata: ArgumentMetadata): SignupDto;
    private valueHasPassAndConfPass;
}
