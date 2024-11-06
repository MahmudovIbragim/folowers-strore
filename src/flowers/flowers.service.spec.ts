import { ConfigModule } from '@nestjs/config';
import { FlowersService } from './flowers.service';
import { PrismaService } from '../prisma.servive';
import { Test } from '@nestjs/testing';

describe('FlowersService', () => {
  let service: FlowersService;
  const mockFlowerData = [
    {
      id: 1,
      name: 'Роза',
      color: 'красный',
      price: 150,
      createAt: '2024-10-27T16:36:26.518Z',
      updateAt: '2024-10-27T16:36:26.518Z',
    },
    // Добавьте остальные цветы из исходного массива данных для более точного теста.
  ];
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        FlowersService,
        {
          provide: PrismaService,
          useValue: {
            flower: {
              findMany: jest.fn().mockResolvedValue(mockFlowerData),
              create: jest.fn().mockResolvedValue(mockFlowerData[0]),
            },
          },
        },
      ],
    }).compile();
    service = module.get<FlowersService>(FlowersService);
  });

  it('should return an array of flowers', async () => {
    expect(await service.findAll()).toEqual(mockFlowerData);
  });

  it('should create a new flower', async () => {
    expect(await service.create({ name: 'Роза', color: 'красный', price: 150 })).toEqual(
      mockFlowerData[0],
    );
  });
});
