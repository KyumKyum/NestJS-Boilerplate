//* Default Exception Filter

import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const resp = ctx.getResponse<Response>();

        const status = exception.getStatus();
        const msg = exception.getResponse();

        resp.status(status).json({
            code: status,
            message: msg,
            result: null,
        });
    }
}
