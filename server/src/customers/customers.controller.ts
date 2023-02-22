import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomerDto } from './dto/get-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.createCustomer(createCustomerDto);
  }

  @Get('/all')
  findAllCustomer() {
    return this.customersService.findAllCustomer();
  }

  @Get()
  findCustomerById(@Query() getCustomerDto: GetCustomerDto) {
    return this.customersService.findCustomerById(getCustomerDto);

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete('/remove')
  removeCustomer(@Body() getCustomerDto: GetCustomerDto) {
    return this.customersService.removeCustomer(getCustomerDto);
  }
}
