/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCarrinhoDto {
  @IsInt()
  @IsNotEmpty()
  clienteId: number;

  @IsInt()
  @IsNotEmpty()
  produtoId: number;

  @IsInt()
  @IsNotEmpty()
  quantidade: number;
}
