import { IsNumber, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  dataNascimento: string;

  @IsNumber()
  celular: number;

  @IsString()
  endereco: string;

  @IsNumber()
  cpf: number;
}
