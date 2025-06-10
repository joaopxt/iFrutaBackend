import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  nomeUsuario: string;

  @IsString()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6,{ message: 'A senha precisa ter mais do que seis caracteres!' })
  senha: string;

  @IsEmail()
  email: string;
}

export class LoginDto {
  @IsString()
  nomeUsuario: string;

  @IsString()
  senha: string;
}
