// create-endereco.dto.ts
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateEnderecoDto {
  @IsNumber()
  clienteId: number;

  @IsString()
  @IsNotEmpty()
  rua: string;

  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsString()
  @IsNotEmpty()
  bairro: string;

  @IsString()
  @IsNotEmpty()
  cidade: string;

  @IsString()
  @IsNotEmpty()
  estado: string;
}
