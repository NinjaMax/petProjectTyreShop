import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViberApiService } from './viber-api.service';
import { CreateViberApiDto } from './dto/create-viber-api.dto';
import { UpdateViberApiDto } from './dto/update-viber-api.dto';

@Controller('viber-api')
export class ViberApiController {
  constructor(private readonly viberApiService: ViberApiService) {}

  @Post()
  create(@Body() createViberApiDto: CreateViberApiDto) {
    return this.viberApiService.create(createViberApiDto);
  }

  @Get()
  findAll() {
    return this.viberApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viberApiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViberApiDto: UpdateViberApiDto) {
    return this.viberApiService.update(+id, updateViberApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viberApiService.remove(+id);
  }
}
