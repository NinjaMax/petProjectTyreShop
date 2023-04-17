var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import * as fs from 'fs';
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const httpsOptions = {
                key: fs.readFileSync('../config/cert.key'),
                cert: fs.readFileSync('../config/cert.crt'),
            };
            const app = yield NestFactory.create(AppModule, { httpsOptions });
            const configService = app.get(ConfigService);
            app.enableCors({
                origin: [
                    'http://localhost:3000',
                    'http://localhost:4000'
                ],
                methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
                credentials: true,
            });
            const PORT = +configService.get('PORT' || '5000');
            yield app.listen(PORT, () => console.log(`Server Start on ${PORT}`));
        }
        catch (error) {
            console.log(error);
        }
    });
}
bootstrap();
