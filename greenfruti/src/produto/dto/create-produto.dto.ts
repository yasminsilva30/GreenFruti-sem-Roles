/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsOptional, IsInt } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  nome: string;

  @IsNumber()
  preco: number;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsInt()
  lojaId: number;
}
