// import { LoggingInterceptor } from 'src/conception/intercepter';
import {
  Body,
  Controller,
  Get,
  Post,
  // Query,
  // UseGuards,
  // UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
// import { ParseIntPipe } from 'src/conception/pipe';
// import { AuthGuard } from 'src/conception/guard';
import { FlowersCreateDto } from './flowers.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('flowers')
@ApiTags('Flowers')
// @UseInterceptors(LoggingInterceptor)
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}
  @Get()
  // @UseGuards(AuthGuard)
  // findAll(@Query('page', ParseIntPipe) pageNumber: number) {
  //   console.log(pageNumber);

  //   return this.flowersService.findAll();
  // }
  findAll() {
    console.log('pageNumber');
    return this.flowersService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  // @UseGuards(AuthGuard)
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: FlowersCreateDto,
    description: 'Json structure of flowers object',
  })
  create(@Body() dto: FlowersCreateDto) {
    console.log(dto);
    return this.flowersService.create(dto);
  }
}
