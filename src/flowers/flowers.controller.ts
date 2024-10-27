import { LoggingInterceptor } from 'src/conception/intercepter';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { ParseIntPipe } from 'src/conception/pipe';
import { AuthGuard } from 'src/conception/guard';
import { FlowersCreateDto } from './flowers.dto';

@Controller('flowers')
@UseInterceptors(LoggingInterceptor)
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}
  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('pageNumber', ParseIntPipe) pageNumber: number) {
    console.log(pageNumber);

    return this.flowersService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() dto: FlowersCreateDto) {
    console.log(dto);
    return this.flowersService.create(dto);
  }
}
