import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotImplementedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { RedirectOptions } from './redirect.decorator';

@Injectable()
export class RedirectInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const handler = context.getHandler();
    const options = (Reflect.getMetadata('redirectOptions', handler) ||
      {}) as RedirectOptions;
    const res$ = next.handle();
    return res$.toPromise().then(result => {
      if (result && this.isRedirect(result)) {
        return response.redirect(result.statusCode, result.url);
      } else if (this.isRedirect(options)) {
        return response.redirect(options.statusCode, options.url);
      } else if (options.optionalRedirect !== true) {
        throw new NotImplementedException();
      }

      return result;
    });
  }

  isRedirect(obj: any): boolean {
    if (obj && obj.hasOwnProperty('statusCode') && obj.hasOwnProperty('url')) {
      return true;
    }
    return false;
  }
}
