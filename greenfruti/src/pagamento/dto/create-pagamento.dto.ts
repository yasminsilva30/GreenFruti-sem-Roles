/* eslint-disable prettier/prettier */
import { IsString, IsNumber } from 'class-validator';

export class CreatePagamentoDto {
  @IsString()
  metodo: string;

  @IsString()
  status: string;

  @IsNumber()
  carrinhoId: number;

}
