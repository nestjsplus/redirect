<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">Decorator for handling Redirects with NestJS</h3>

<div align="center">
   <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="License" />
  <img src="https://badge.fury.io/js/%40nestjsplus%2Fredirect.svg" alt="npm version" height="18">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Installation

```bash
npm install @nestjsplus/redirect
```

### Examples
NestJS doesn't currently have a decorator for doing redirects on route handlers.
Here's how it looks with this decorator:

```typescript
@Redirect({statusCode: HttpStatus.TEMPORARY_REDIRECT, url: 'https://nestjs.com'})
@Get('nest')
nest() {
  return;
}
```

Here's how it looks when the redirect response is determined *dynamically*:
```typescript
@Redirect()
@Get('/somelocation')
index() {
  const url = this.getNewLocation();
  return { statusCode: HttpStatus.FOUND, url };
}
```

### Motivation
To do a redirect with Nest out-of-the-box, you either need to utilize the platform-specific
response (`res`) object, or write an interceptor. The former is pretty straightforward, though
uses a non-Nest-like imperative style.  It also puts you into
[manual response mode](https://docs.nestjs.com/controllers#routing),
meaning you can no longer rely on features like `@Render()`, `@HttpCode()` or [interceptors that modify the response](https://docs.nestjs.com/interceptors#response-mapping), and makes testing harder (you'll have to mock the response
object, etc.).

Writing an interceptor isn't too bad, but wouldn't you rather just plug one in? :heart:
The `@Redirect()` decorator from this package wraps an interceptor
in a declarative decorator that does this for you.

### See Also
If you like this little gizmo, you may also be interested in the [NestJS Cookie
decorators](https://github.com/nestjsplus/cookies).

Collectively, the `@Redirect(), @Cookies()`, `@SignedCookies()`, `@SetCookies()`
and `@ClearCookies()` decorators in these packages
provide a convenient set of features that make it easier to manage redirects and
cookies in a standard and declarative way, minimize boilerplate code, and continue
to use Nest features like `@Headers()`, `@Render()`, and other interceptors that
mutate the response.

### Importing the Decorator
Import the decorator, just as you would other Nest decorators, in the controllers
that use it as shown below:

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Redirect } from '@nestjsplus/redirect';

@Controller()
export class AppController {
...
```

### Static Redirects
For static redirects, where the `statusCode` and `url` (AKA `location` in the
response headers) are known at compile time, simply specify them in the decorator:

```typescript
@Redirect({statusCode: HttpStatus.TEMPORARY_REDIRECT, url: 'https://nestjs.com'})
@Get('nest')
nest {
  return;
}
```
### Dynamic Redirects
For dynamic redirects, where the `statusCode` and/or `url` are
computed in the route handler method, return an object from the method with
the shape:

```typescript
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
@Get('/somelocation')
index() {
  const url = this.getNewLocation();
  return { statusCode: HttpStatus.FOUND, url };
}
```

### Recommendations
Utilize the `HttpStatus` enum from the `@nestjs/common` package to ensure you send
the correct Http Status Codes, and to get convenient intellisense.

### Restrictions
#### Express Only
This decorator currently only work with Nest applications running on `@platform-express`.  Fastify support is not
currently available.

#### Decorators Can't Access `this`
Note that decorators have access to the `class` (Controller), but not the instance.  This means that, for example,
if you want to pass a variable to a `Redirect()` decorator, you should pass a variable set in the outer scope of
the file (e.g., a `const` above the controller class definition), as opposed to a property on the controller class.

## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Author

- **John Biundo (Y Prospect on [Discord](https://discord.gg/G7Qnnhy))**

## License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.