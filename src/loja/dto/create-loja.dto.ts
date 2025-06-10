import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Column } from 'typeorm';

export class CreateLojaDto {
  @IsNumber()
  //   @Min(14, { message: 'CNPJ Inválido' })
  //   @Max(15, { message: 'CNPJ Inválido' })
  cnpj: number;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  horarioFuncionamento: string;

  @IsString()
  @IsNotEmpty()
  endereco: string;

  @IsNumber()
  userId: number;
}
