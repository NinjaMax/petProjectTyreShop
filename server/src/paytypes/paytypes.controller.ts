import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaytypesService } from './paytypes.service';
import { CreatePaytypeDto } from './dto/create-paytype.dto';
import { UpdatePaytypeDto } from './dto/update-paytype.dto';

@Controller('paytypes')
export class PaytypesController {
  constructor(private readonly paytypesService: PaytypesService) {}

  @Post()
  create(@Body() createPaytypeDto: CreatePaytypeDto) {
    return this.paytypesService.create(createPaytypeDto);
  }

  @Get('/all')
  findAll() {
    return this.paytypesService.findAllPayTypes();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paytypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaytypeDto: UpdatePaytypeDto) {
    return this.paytypesService.update(+id, updatePaytypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paytypesService.remove(+id);
  }
}
