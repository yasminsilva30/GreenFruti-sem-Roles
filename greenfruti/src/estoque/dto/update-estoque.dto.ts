/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateEstoqueDto } from './create-estoque.dto';

export class UpdateEstoqueDto extends PartialType(CreateEstoqueDto) {}
