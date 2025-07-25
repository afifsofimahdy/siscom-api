import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../response/api-response';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map(data => {
        // Jika data sudah dalam format ApiResponse, kembalikan langsung
        if (data instanceof ApiResponse) {
          return data;
        }
        
        // Jika tidak, bungkus dalam ApiResponse
        return ApiResponse.success(data);
      }),
    );
  }
}