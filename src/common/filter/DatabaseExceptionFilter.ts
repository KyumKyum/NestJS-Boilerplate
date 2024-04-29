//* Default Exception Filter

import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from "@nestjs/common";
import {Response} from "express";
import {QueryFailedError, TypeORMError} from "typeorm";

@Catch(QueryFailedError, TypeORMError)
export class DatabaseExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError | TypeORMError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const resp = ctx.getResponse<Response>();

        const status = HttpStatus.INTERNAL_SERVER_ERROR
        const msg = exception.message

        resp.status(status).json({
            code: status,
            message: msg,
            result: null
        })
    }
}
