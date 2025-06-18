/* eslint-disable prettier/prettier */
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateLojaDto {
  @IsString()
  nome: string;

  @IsString()
  endereco: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsNumber()
  'dono-lojaId': number;
  
}
