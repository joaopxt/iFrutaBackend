import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVendaDto {
  @IsNumber()
  @IsNotEmpty()
  cartId: number;

  @IsNumber()
  @IsNotEmpty()
  formaPagamentoId: number;

  @IsString()
  endereco: string;
}
