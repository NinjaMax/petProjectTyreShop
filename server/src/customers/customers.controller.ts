import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomerDto } from './dto/get-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
    password: string,
  ) {
    return this.customersService.createCustomer(createCustomerDto, password);
  }

  @Get('/all')
  findAllCustomer() {
    return this.customersService.findAllCustomer();
  }

  @Get('/byphone')
  findCustomerByPhone(@Body() getCustomerDto: GetCustomerDto) {
    return this.customersService.findCustomerByPhone(getCustomerDto);
  }

  @Get('/byemail')
  findCustomerByEmail(@Body() getCustomerDto: GetCustomerDto) {
    return this.customersService.findCustomerByEmail(getCustomerDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.updateCustomer(+id, updateCustomerDto);
  }

  @Delete('/remove')
  removeCustomer(@Body() getCustomerDto: GetCustomerDto) {
    return this.customersService.removeCustomer(getCustomerDto);
  }
}
