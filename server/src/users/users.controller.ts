import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, password: string) {
    return this.usersService.createUser(createUserDto, password);
  }

  @Get('/all')
  findAll() {
    return this.usersService.findAlluser();
  }

  @Get('/id')
  findOne(@Param() @Body() getUseDto: GetUserDto) {
    return this.usersService.findUserById(getUseDto);
  }

  @Get('/phone')
  findUserByPhone(@Body() getUseDto: GetUserDto) {
    return this.usersService.findUserByPhone(getUseDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUserByUser(+id, updateUserDto);
  }

  @Delete('/remove')
  remove(@Param() @Body() getUseDto: GetUserDto) {
    return this.usersService.removeUser(getUseDto);
  }
}
