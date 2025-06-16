import { IsString } from 'class-validator';

export class CreateFormaPagamentoDto {
  @IsString()
  nome: string;
}
