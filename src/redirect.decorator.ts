import { UseInterceptors, SetMetadata } from '@nestjs/common';
import { RedirectInterceptor } from './redirect.interceptor';

/**
 * Options object for `@Redirect()` Decorator.
 */
export interface RedirectOptions {
  /**
   * URL to redirect to.
   */
  url?: string;
  /**
   * HTTP Status Code to send.
   */
  statusCode?: number;
  /**
   * Accept optional redirect
   * If not matching redirect options- path returned value further
   */
  optionalRedirect?: boolean;
}

/**
 * Decorator that will cause method handler to issue an HTTP redirect.
 *
 * For example: `@Redirect({url: 'https://nests.com', statusCode: 302})`
 *
 * Method can return a `RedirectOptions` object. Doing so overrides a
 * `RedirectOptions` object supplied as a decorator options parameter.
 *
 * For example: method with
 * ```typescript
 * index() {
 *   ...
 *   return { statusCode: 307, url: 'https://www.google.com'};
 *   ...
 * }
 * ```
 * will send 307 HTTP Status Code and location of `'https://www.google.com'`
 *
 * @param options RedirectOptions
 * @param options.url URL to redirect to
 * @param options.statusCode HTTP Status Code to send
 * @param options.optionalRedirect Accept optional redirect
 */
export const Redirect = (options?: RedirectOptions) => {
  return (target, propertyKey, descriptor) => {
    if (options) {
      SetMetadata('redirectOptions', options)(target, propertyKey, descriptor);
    }
    UseInterceptors(RedirectInterceptor)(target, propertyKey, descriptor);
  };
};
