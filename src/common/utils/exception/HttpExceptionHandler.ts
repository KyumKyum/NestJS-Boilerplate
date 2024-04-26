import {HttpException, HttpStatus} from "@nestjs/common";

export class HttpExceptionHandler {
    static handle(e: unknown): HttpException{
        if(e instanceof HttpException) return e;
        else return new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
