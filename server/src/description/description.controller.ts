import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DescriptionService } from './description.service';
import { CreateDescriptionDto } from './dto/create-description.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';

@Controller('description')
export class DescriptionController {
  constructor(private readonly descriptionService: DescriptionService) {}

  @Post()
  create(@Body() createDescriptionDto: CreateDescriptionDto) {
    return this.descriptionService.createDescription(createDescriptionDto);
  }

  @Get('/all')
  findAll() {
    return this.descriptionService.findAllDescription();
  }

  @Get(':id')
  findOne(@Param('id') id_description: number) {
    return this.descriptionService.findDescriptionById(+id_description);
  }

  @Patch('/update')
  update(
    //@Param('id') id: string,
    @Body() updateDescriptionDto: UpdateDescriptionDto,
  ) {
    return this.descriptionService.updateDescription(updateDescriptionDto);
  }

  @Delete('/delete')
  remove(@Body() createDescriptionDto: CreateDescriptionDto) {
    return this.descriptionService.removeDescription(createDescriptionDto);
  }
}
