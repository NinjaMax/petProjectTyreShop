import { HttpException, HttpStatus } from "@nestjs/common";
export class ErrorException extends HttpException {
    constructor(response) {
        super(response, HttpStatus.BAD_REQUEST);
        this.messages = response;
    }
}
