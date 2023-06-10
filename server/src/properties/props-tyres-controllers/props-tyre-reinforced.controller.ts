import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropsTyreReinforceService } from '../props-tyres-services/props-tyre-reinforce.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Controller('properties')
export class PropertiesReinforcedController {
  constructor(
    private readonly propertiesReinforcedService: PropsTyreReinforceService,
  ) {}

  @Post('/reinforced')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesReinforcedService.createTyreReinforce(
      createPropertyDto,
    );
  }

  @Get('/allreinforced')
  findAll() {
    return this.propertiesReinforcedService.findAllTyreReinforce();
  }

  @Get('/reinforced/id')
  findOne(@Param() getPropertyDto: GetPropertyDto) {
    return this.propertiesReinforcedService.findTyreReinforceById(
      getPropertyDto,
    );
  }

  @Patch('/reinforced/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesReinforcedService.updateTyreReinforce(
      updatePropertyDto,
    );
  }

  @Delete('/reinforced/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propertiesReinforcedService.removeTyreReinforce(getPropertyDto);
  }
}
