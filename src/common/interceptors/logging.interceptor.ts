import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppLoggerService } from '../logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: AppLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const now = Date.now();

    return next.handle().pipe(
      tap({
        next: (data) => {
          const response = context.switchToHttp().getResponse();
          const statusCode = response.statusCode;
          
          this.logger.log(
            `${method} ${url} ${statusCode} ${Date.now() - now}ms`,
            'HTTP',
          );
        },
        error: (error) => {
          this.logger.error(
            `${method} ${url} ${error.status || 500} ${Date.now() - now}ms`,
            error.stack,
            'HTTP',
          );
        },
      }),
    );
  }
}