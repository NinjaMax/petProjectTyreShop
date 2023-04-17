import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../../config/config.service';
export declare class GoogleAuthService {
    private configService;
    private jwtService;
    constructor(configService: ConfigService, jwtService: JwtService);
    getGoogleAuthURL(): Promise<string>;
    getTokensGoogle({ code, clientId, clientSecret, redirectUri, }: {
        code: string;
        clientId: string;
        clientSecret: string;
        redirectUri: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
        scope: string;
        id_token: string;
    }>;
    getGoogleUser(req: any, res: any): Promise<void>;
    getCurrentUser(req: any, res: any): Promise<any>;
}
