import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Session,
  Res,
  Req,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomerDto } from './dto/get-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

import { Cookies } from '../auth/decorators/cookies.decorator';
import { Request, Response } from 'express';

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

  @Post('/add-comparison')
  addToComparison(
    //@Cookies('comparison_goods') cookies: string,
    //@Session() session: Record<string, any>,
    @Body() comparison: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log('COMPARE_COOKIE_BODY: ', comparison.comparison);
    console.log('COMPARE_COOKIE_GET: ', req.cookies.comparison_goods);
    if (Array.isArray(req.cookies.comparison_goods)) {
      req.cookies.comparison_goods.push(...comparison.comparison);
      res.cookie(
        'comparison_goods',
        Array.from(new Set(req.cookies.comparison_goods)),
        {
          maxAge: 1209600000,
          httpOnly: true,
          secure: true,
      });
      return res.send(Array.from(new Set(req.cookies.comparison_goods)));
    } else {
      res.cookie('comparison_goods', comparison.comparison, {
        maxAge: 1209600000,
        httpOnly: true,
        secure: true,
      });
      return res.send(comparison.comparison);
    };
  };

  @Post('/add-favorites')
  addToFavorites(
    //@Cookies('comparison_goods') cookies: string,
    //@Session() session: Record<string, any>,
    @Body() favorite: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    console.log('COMPARE_COOKIE_BODY: ', favorite.favorite);
    console.log('COMPARE_COOKIE_GET: ', req.cookies.favorites_goods);
    if (Array.isArray(req.cookies.favorites_goods)) {
      req.cookies.favorites_goods.push(...favorite.favorite);
      res.cookie(
        'favorites_goods',
        Array.from(new Set(req.cookies.favorites_goods)),
        {
          maxAge: 1209600000,
          httpOnly: true,
          secure: true,
      });
      return res.send(Array.from(new Set(req.cookies.favorites_goods)));
    } else {
      res.cookie('favorites_goods', favorite.favorite, {
        maxAge: 1209600000,
        httpOnly: true,
        secure: true,
      });
      return res.send(favorite.favorite);
    };
  };

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
