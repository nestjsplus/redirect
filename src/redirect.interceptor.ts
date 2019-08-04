import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotImplementedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';

@Injectable()
export class RedirectInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const handler = context.getHandler();
    const options = Reflect.getMetadata('redirectOptions', handler);
    const res$ = next.handle();
    return res$.toPromise().then(result => {
      if (result && this.isRedirect(result)) {
        response.redirect(result.statusCode, result.url);
      } else if (this.isRedirect(options)) {
        response.redirect(options.statusCode, options.url);
      } else {
        throw new NotImplementedException();
      }
      return undefined;
    });
  }

  isRedirect(obj: any): boolean {
    if (obj && obj.hasOwnProperty('statusCode') && obj.hasOwnProperty('url')) {
      return true;
    }
    return false;
  }
}
