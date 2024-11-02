import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import * as request from 'supertest';

describe('FLowersConteroller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleMixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/flowers (GET)', () => {
    return request(app.getHttpServer())
      .get('/flowers')
      .expect(200)
      .expect([
        {
          id: 1,
          name: 'Роза',
          color: 'красный',
          price: 150,
          createAt: '2024-10-27T16:36:26.518Z',
          updateAt: '2024-10-27T16:36:26.518Z',
        },
        {
          id: 2,
          name: 'Тюльпан',
          color: 'желтый',
          price: 80,
          createAt: '2024-10-27T16:36:45.659Z',
          updateAt: '2024-10-27T16:36:45.659Z',
        },
        {
          id: 3,
          name: 'Лилия',
          color: 'белый',
          price: 120,
          createAt: '2024-10-27T16:36:58.609Z',
          updateAt: '2024-10-27T16:36:58.609Z',
        },
        {
          id: 4,
          name: 'Гербера',
          color: 'розовый',
          price: 90,
          createAt: '2024-10-27T16:37:12.307Z',
          updateAt: '2024-10-27T16:37:12.307Z',
        },
        {
          id: 5,
          name: 'Хризантема',
          color: 'оранжевый',
          price: 70,
          createAt: '2024-10-27T16:37:19.396Z',
          updateAt: '2024-10-27T16:37:19.396Z',
        },
      ]);
  });

  it('/flowers (POST)', () => {
    return request(app.getHttpServer())
      .post('/flowers')
      .send({
        name: 'Тюльпан',
        color: 'желтый',
        price: 80,
      })
      .expect(201)
      .expect({
        name: 'Тюльпан',
        color: 'желтый',
        price: 80,
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
