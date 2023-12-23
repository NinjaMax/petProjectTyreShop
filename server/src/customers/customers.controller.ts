import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { GetCustomerDto } from './dto/get-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
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

  @Post('/form')
  createCustomerForm(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.createCustomerNew(createCustomerDto);
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

  @Get('/by-id/:id')
  findCustomerIdBy(@Param('id') id: string) {
    return this.customersService.findCustomerByIdParams(+id);
  }

  @Post('/add-comparison')
  addToComparison(
    @Body() comparison: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
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
    @Body() favorite: any,
    @Req() req: Request,
    @Res() res: Response,
  ) {
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

  @Get('/get-comparison')
  getComparison(@Req() req: Request, @Res() res: Response) {
    if (Array.isArray(req.cookies.comparison_goods)) {
      return res.send(req.cookies.comparison_goods);
    } else {
      return res.send(null);
    };
  };

  @Get('/get-favorites')
  getFavorites(@Req() req: Request, @Res() res: Response) {
    if (Array.isArray(req.cookies.favorites_goods)) {
      return res.send(req.cookies.favorites_goods);
    } else {
      return res.send(null);
    };
  };

  @Delete('/clear-comparison')
  clearComparison(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (Array.isArray(req.cookies.favorites_goods)) {
      res.clearCookie('comparison_goods', {
        httpOnly: true,
        secure: true,
      });
    } else {
      return res.send(null);
    };
  };

  @Delete('/clear-favorites')
  clearFavorites(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (Array.isArray(req.cookies.favorites_goods)) {
      res.clearCookie('favorites_goods', {
        httpOnly: true,
        secure: true,
      });
    } else {
      return res.send(null);
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
