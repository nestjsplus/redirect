import { Controller, Get, HttpStatus } from '@nestjs/common';
import { Redirect } from '../../src/redirect.decorator';

@Controller()
export class AppController {
  constructor() {}

  @Redirect({
    statusCode: HttpStatus.TEMPORARY_REDIRECT,
    url: 'https://nestjs.com',
  })
  @Get('/test1')
  test1() {
    return;
  }

  @Redirect({
    statusCode: HttpStatus.TEMPORARY_REDIRECT,
    url: 'https://nestjs.com',
  })
  @Get('/test2')
  test2() {
    return { statusCode: HttpStatus.FOUND, url: 'https://www.google.com' };
  }

  @Redirect()
  @Get('/test3')
  test3() {
    return { statusCode: HttpStatus.FOUND, url: 'https://www.google.com' };
  }

  @Redirect()
  @Get('/test4')
  test4() {
    return;
  }
}
