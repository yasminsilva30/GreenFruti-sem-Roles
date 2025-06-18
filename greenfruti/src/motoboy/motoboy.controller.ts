/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Put, 
  Param, 
  Delete, 
  Request 
} from '@nestjs/common';
import { MotoboysService } from './motoboy.service';
import { CreateMotoboyDto } from './dto/create-motoboy.dto';
import { UpdateMotoboyDto } from './dto/update-motoboy.dto';

@Controller('motoboys')
export class MotoboysController {
  constructor(private readonly motoboysService: MotoboysService) {}

  @Post()
  create(@Body() dto: CreateMotoboyDto, @Request() req) {
    const user = req.user;
    return this.motoboysService.create({
      ...dto,
      userId: user?.id ?? null, // usa o id do user, se existir
    });
  }

  @Get()
  findAll() {
    return this.motoboysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.motoboysService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMotoboyDto) {
    return this.motoboysService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.motoboysService.remove(+id);
  }
}
