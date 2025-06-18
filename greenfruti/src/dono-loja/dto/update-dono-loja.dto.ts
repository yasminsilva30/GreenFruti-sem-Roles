/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateDonoLojaDto } from './create-dono-loja.dto';

export class UpdateDonoLojaDto extends PartialType(CreateDonoLojaDto) {}
