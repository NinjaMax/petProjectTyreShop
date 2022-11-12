import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('/all')
  findAll() {
    return this.usersService.findAlluser();
  }

  @Get('/id')
  findOne(@Param() @Body() getUseDto: GetUserDto) {
    return this.usersService.findUserById(getUseDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('/remove')
  remove(@Param() @Body() getUseDto: GetUserDto) {
    return this.usersService.removeUser(getUseDto);
  }
}
