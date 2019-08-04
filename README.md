<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">Decorator for handling Redirects with NestJS</h3>

<div align="center">
   <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="License" />
  <img src="https://badge.fury.io/js/%40nestjsplus%2Fcookies.svg" alt="npm version" height="18">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Installation

```bash
npm install @nestjsplus/redirect
```

### Motivation
NestJS doesn't currently have a decorator for doing redirects on route handlers.

```typescript
@Redirect({statusCode: HttpStatus.TEMPORARY_REDIRECT, url: 'https://nestjs.com'})
@Get('nest')
nest {
  return;
}
```

To do a redirect, you either need to utilize the platform-specific
response (`res`) object, or write an interceptor. The former is pretty straightforward, though
takes a non-Nest-like imperative style.  The latter puts you into [manual response mode](https://docs.nestjs.com/controllers#routing),
meaning you can no longer rely on features like `@Render()`, `@HttpCode()` or [interceptors that modify the response](https://docs.nestjs.com/interceptors#response-mapping), and making testing harder (you'll have to mock the response
object, etc.).  The `@Redirect()` decorator from this package wraps an interceptor
in a declarative decorator that solves these issues.



### See Also
You may also be interested in the Nestjs Cookie decorators.  See `@nestjsplus/cookies`
for more information.  [Link](https://github.com/nestsjsplus/cookies).

Collectively, the `@Redirect(), @Cookies()`, `@SignedCookies()`, `@SetCookies()`
and `@ClearCookies()` decorators in these packages
provide a convenient set of features that make it easier to manage redirects and
cookies in a standard and declarative way, and minimize boilerplate code.

### Importing the Decorator
Import the decorator, just as you would other Nest decorators, in the controllers
that uses it.  Use `import { Redirect } from @nestjsplus/redirect` as shown
below:

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Redirect } from '@nestjsplus/redirect';

@Controller()
export class AppController {
...
```

### Static Redirects
For static redirects, where the `statusCode` and `url` (AKA `location`) are known at
compile time, simply specify them in the decorator:

```typescript
@Redirect({statusCode: HttpStatus.TEMPORARY_REDIRECT, url: 'https://nestjs.com'})
@Get('nest')
nest {
  return;
}
```
### Dynamic Redirects
For dynamic redirects, where the `statusCode` and/or `url` (AKA `location`) are
computed in the route handler method, simply return an object from the method with
the shape:

```typsecript
interface RedirectOptions {
  /**
   * URL to redirect to.
   */
  url: string;
  /**
   * HTTP Status Code to send.
   */
  statusCode: number;
}
```
For example:

```typescript
@Redirect()
@Get('/google')
google() {
  return { statusCode: HttpStatus.FOUND, url: 'https://www.google.com' };
}
```

### Recommendations
Utilize the `HttpStatus` enum from the `@nestjs/common` package to ensure you use
the correct Http Status Codes, and to get convenient "intellisense"/autocompletion.

### Restrictions
#### Express Only
This decorators currently only work with Nest applications running on `@platform-express`.  Fastify support is not
currently available.

#### Decorators Can't Access `this`
Note that decorators have access to the `class` (Controller), but not the instance.  This means that, for example,
if you want to pass a variable to a `SetCookies()` decorator, you should pass a variable set in the outer scope of
the file (e.g., a `const` above the controller class definition), as opposed to a property on the controller class.

See [the controller in the test folder](https://github.com/nestjsplus/redirect/blob/master/test/src/app.controller.ts) for an example.

## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

- **John Biundo (Y Prospect on [Discord](https://discord.gg/G7Qnnhy))**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.