import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './src/app.module';

describe('AppController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/test1 should TEMPORARY_REDIRECT and location = "https://nestjs.com"', () => {
    return request(app.getHttpServer())
      .get('/test1')
      .expect(HttpStatus.TEMPORARY_REDIRECT)
      .expect(res => {
        const url = res.header['location'];
        expect(url).toEqual('https://nestjs.com');
      });
  });

  it('/test2 should FOUND and location = "https://www.google.com"', () => {
    return request(app.getHttpServer())
      .get('/test2')
      .expect(HttpStatus.FOUND)
      .expect(res => {
        const url = res.header['location'];
        expect(url).toEqual('https://www.google.com');
      });
  });

  it('/test3 should FOUND and location = "https://www.google.com"', () => {
    return request(app.getHttpServer())
      .get('/test3')
      .expect(HttpStatus.FOUND)
      .expect(res => {
        const url = res.header['location'];
        expect(url).toEqual('https://www.google.com');
      });
  });

  it('/test4 should return NOT_IMPLEMENTED', () => {
    return request(app.getHttpServer())
      .get('/test4')
      .expect(HttpStatus.NOT_IMPLEMENTED);
  });
});
