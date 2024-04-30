import {
    BadGatewayException,
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private logger = new Logger('LOG');
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const req = context.switchToHttp().getRequest<Request>();
        const res = context.switchToHttp().getResponse<Response>();

        console.log(res);
        const method = req.method;
        const url = req.url;
        const now = Date.now();

        this.logger.log(`REQUEST: ${method} ${url} - ${JSON.stringify(req.body)}`);

        return next.handle().pipe(
            tap({
                next: () => {
                    const delay = Date.now() - now;
                    this.logger.log(
                        `RESPONSE: ${method} ${url} - Response with status code ${res.statusCode}. [${delay}]`,
                    );
                },
                error: (error) => {
                    const delay = Date.now() - now;
                    this.logger.log(`ERROR: ${method} ${url} - Error Message: ${error.message} [${delay}]`);
                },
            }),
        );
    }
}
