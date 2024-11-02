import { Module } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { FlowersController } from './flowers.controller';
import { PrismaService } from '../prisma.servive';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [FlowersController],
  providers: [FlowersService, PrismaService, ConfigService],
  exports: [FlowersService],
})
export class FlowersModule {}
