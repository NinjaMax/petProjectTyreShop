import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SmsFlyApiService } from './sms-fly-api.service';
import { CreateSmsFlyApiDto } from './dto/create-sms-fly-api.dto';
import { UpdateSmsFlyApiDto } from './dto/update-sms-fly-api.dto';

@Controller('sms-fly-api')
export class SmsFlyApiController {
  constructor(private readonly smsFlyApiService: SmsFlyApiService) {}

  @Post()
  create(@Body() createSmsFlyApiDto: CreateSmsFlyApiDto) {
    return this.smsFlyApiService.sendSmsViber(createSmsFlyApiDto);
  }

  @Get()
  findAll() {
    return this.smsFlyApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.smsFlyApiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSmsFlyApiDto: UpdateSmsFlyApiDto) {
    return this.smsFlyApiService.update(+id, updateSmsFlyApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.smsFlyApiService.remove(+id);
  }
}
