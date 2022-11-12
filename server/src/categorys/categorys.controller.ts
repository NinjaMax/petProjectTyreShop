import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoryDto } from './dto/get-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategorysController {
  constructor(private readonly categorysService: CategorysService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categorysService.createCategory(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categorysService.findAllCategory();
  }

  @Get('/id')
  findOne(@Param() getCategoryDto: GetCategoryDto) {
    return this.categorysService.findCatById(getCategoryDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categorysService.update(+id, updateCategoryDto);
  }

  @Delete('/remove')
  remove(@Param() getCategoryDto: GetCategoryDto) {
    return this.categorysService.removeCategory(getCategoryDto);
  }
}
