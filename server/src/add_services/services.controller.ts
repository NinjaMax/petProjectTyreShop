import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { GetServiceDto } from './dto/get-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.createService(createServiceDto);
  }

  @Get()
  findAll() {
    return this.servicesService.findAllService();
  }

  @Get('/id')
  findOne(@Param() @Body() getServiceDto: GetServiceDto) {
    return this.servicesService.findServiceById(getServiceDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete('/remove')
  remove(@Param() @Body() getServiceDto: GetServiceDto) {
    return this.servicesService.removeService(getServiceDto);
  }
}
