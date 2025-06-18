/* eslint-disable prettier/prettier */
import { IsString, IsEmail } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  telefone: string;
}
