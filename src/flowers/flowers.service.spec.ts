import { Test } from '@nestjs/testing';
import { FlowersService } from './flowers.service';
import { PrismaService } from '../prisma.servive';
import { ConfigModule } from '@nestjs/config';

describe('FlowersService', () => {
  let service: FlowersService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        FlowersService,
        {
          provide: PrismaService,
          useValue: {
            flower: {
              findMany: jest.fn().mockResolvedValue([
                {
                  id: 1,
                  name: 'rose',
                  color: 'red',
                  price: 10,
                },
              ]),
              create: jest.fn().mockResolvedValue({
                id: 1,
                name: 'lily',
                color: 'yellow',
                price: 20,
              }),
            },
          },
        },
        {
          provide: 'ConfigService',
          useValue: {},
        },
      ],
    }).compile();
    service = module.get<FlowersService>(FlowersService);
  });
  it('should return an array of flowers', async () => {
    expect(await service.findAll()).toEqual([
      {
        id: 1,
        name: 'rose',
        color: 'red',
        price: 10,
      },
    ]);
  });

  it('should create a new flower', async () => {
    expect(
      await service.create({ name: 'lily', color: 'yellow', price: 20 }),
    ).toEqual({
      id: 1,
      name: 'lily',
      color: 'yellow',
      price: 20,
    });
  });
});
