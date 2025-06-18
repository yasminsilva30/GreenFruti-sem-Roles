/* eslint-disable prettier/prettier */
import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateEntregaDto {
  @IsInt()
  pagamentoId: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  dataEntrega?: string;

  @IsOptional()
  @IsInt()
  motoboyId?: number;

  @IsOptional()
  @IsInt()
  enderecoId?: number;
}
