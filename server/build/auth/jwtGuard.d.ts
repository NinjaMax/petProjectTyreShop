import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
export declare class JwtGuard implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): boolean;
    protected getRequest<T>(context: ExecutionContext): T;
    protected getToken(request: {
        headers: Record<string, string | string[]>;
    }): string;
}
