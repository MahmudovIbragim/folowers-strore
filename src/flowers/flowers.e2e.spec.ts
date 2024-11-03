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
  it('/flowers (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/flowers')
      .expect(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Роза',
          color: 'красный',
          price: 150,
        }),
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Тюльпан',
          color: 'желтый',
          price: 80,
        }),
        // Другие цветы, которые вы ожидаете
      ]),
    );
  });

  it('/flowers (POST) with invalid data', () => {
    return request(app.getHttpServer())
      .post('/flowers')
      .send({
        name: '',
        color: 'желтый',
        price: 'not-a-number',
      })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
