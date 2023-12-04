import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { GetSupplierDto } from './dto/get-supplier.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.createSupplier(createSupplierDto);
  }

  @Get('/all')
  findSuppliersAll() {
    return this.suppliersService.findAllSupplier();
  }

  @Get('/byid/:id')
  findOneById(@Param('id') id: number) {
    return this.suppliersService.findSupplierByIdParam(id);
  }

  @Patch('/update')
  update(@Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.updateSupplier(updateSupplierDto);
  }

  @Delete('/remove')
  remove(@Body() getSupplierDto: GetSupplierDto) {
    return this.suppliersService.removeSupplier(getSupplierDto);
  }
}
