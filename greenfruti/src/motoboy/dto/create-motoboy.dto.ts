/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMotoboyDto {
  @IsString()
  nome: string;

  @IsString()
  telefone: string;

  @IsNumber()
  @IsOptional()
  userId?: number;
}
