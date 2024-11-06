import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.servive';
import { FlowersCreateDto } from './flowers.dto';
import { EnumAppMode } from 'src/types';

@Injectable()
export class FlowersService {
  constructor(
    readonly prisma: PrismaService,
    readonly configService: ConfigService,
  ) {}

  findAll() {
    console.log(this.configService.get<EnumAppMode>('MODE'));

    return this.prisma.flower.findMany();
  }
  create(dto: FlowersCreateDto) {
    return this.prisma.flower.create({ data: dto });
  }
}
