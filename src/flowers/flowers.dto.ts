import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class FlowersCreateDto {
  @IsString({
    message: 'name must be a string',
  })
  @ApiProperty({
    example: 'ibra',
    required: true,
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: 'red',
    required: true,
  })
  color: string;

  @IsNumber()
  @ApiProperty({
    example: '5',
    required: true,
  })
  price: number;
}

export type TFlowersCreateDto = Partial<FlowersCreateDto>;
