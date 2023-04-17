import { HttpException } from "@nestjs/common";
export declare class ErrorException extends HttpException {
    messages: any;
    constructor(response: string | Record<string, any>);
}
