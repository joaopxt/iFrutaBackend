import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVendaDto {
  @IsNumber()
  @IsNotEmpty()
  cartId: number;

  @IsNumber()
  @IsNotEmpty()
  statusId: 1;
}
