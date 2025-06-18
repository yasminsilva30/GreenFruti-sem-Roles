import { IsNumber, IsArray, IsString } from 'class-validator';

export class CreatePedidoDto {
  @IsNumber()
  clienteId: number;

  @IsNumber()
  pagamentoId: number;

  @IsNumber()
  entregaId: number;

  @IsArray()
  carrinhos: number[];
  
  @IsString()
  status: string;
}
