import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVendaDto {
  @IsString()
  @IsNotEmpty()
  endereco: string;

  @IsNumber()
  @IsNotEmpty()
  cartId: number;

  @IsNumber()
  @IsNotEmpty()
  formaPagamento: number;

  @IsNumber()
  @IsNotEmpty()
  statusId: number;
}
