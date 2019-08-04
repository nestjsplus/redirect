import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { Redirect } from './redirect.decorator';

@Controller()
export class AppController {
  constructor() {}

  @Redirect({ statusCode: 307, url: 'https://nestjs.com' })
  @Get()
  getHello() {
    // return { statusCode: 307, url: 'https://www.google.com' };
  }
}
