import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StorageService } from './storage.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { GetStorageDto } from './dto/get-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  create(@Body() createStorageDto: CreateStorageDto) {
    return this.storageService.createStorage(createStorageDto);
  }

  @Get()
  findAllStorage() {
    return this.storageService.findAllStorage();
  }

  @Get('/stock')
  findAllStorageStock() {
    return this.storageService.findAllStorageStock();
  }

  @Get('/id')
  findOne(@Body() getStorageDto: GetStorageDto) {
    return this.storageService.findStorageById(getStorageDto);
  }

  @Patch(':id')
  update(@Param() id: string, @Body() updateStorageDto: UpdateStorageDto) {
    return this.storageService.update(+id, updateStorageDto);
  }

  @Delete('/remove')
  remove(@Body() getStorageDto: GetStorageDto) {
    return this.storageService.removeStorage(getStorageDto);
  }
}
