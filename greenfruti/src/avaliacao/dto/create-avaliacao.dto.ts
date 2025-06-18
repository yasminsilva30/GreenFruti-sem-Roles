/* eslint-disable prettier/prettier */
import { IsInt, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateAvaliacaoDto {
  @IsInt()
  clienteId: number;

  @IsInt()
  lojaId: number;

  @IsOptional()
  @IsInt()
  motoboyId?: number;

  @IsInt()
  @Min(1)
  @Max(5)
  nota: number;

  @IsOptional()
  @IsString()
  comentario?: string;
}
