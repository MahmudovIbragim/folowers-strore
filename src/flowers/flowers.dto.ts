import { IsNumber, IsString } from 'class-validator';

export class FlowersCreateDto {
  @IsString({
    message: 'name must be a string',
  })
  name: string;

  @IsString()
  color: string;
  @IsNumber()
  price: number;
}

export type TFlowersCreateDto = Partial<FlowersCreateDto>;
