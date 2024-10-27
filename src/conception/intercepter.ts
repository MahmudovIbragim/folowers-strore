import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: any, next: CallHandler): Observable<any> {
    console.log('Before...');

    return next.handle().pipe(tap(() => console.log('After...')));
  }
}
