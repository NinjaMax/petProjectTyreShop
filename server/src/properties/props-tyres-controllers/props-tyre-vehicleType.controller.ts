import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropsTyreVehicleTypeService } from '../props-tyres-services/props-tyre-vehicleType.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Controller('properties')
export class PropertiesVehicleTypeController {
  constructor(
    private readonly propertiesVehicleTypeService: PropsTyreVehicleTypeService,
  ) {}

  @Post('/vehicletype')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesVehicleTypeService.createTyreVehicleType(
      createPropertyDto,
    );
  }

  @Get('/allvehicletype')
  findAll() {
    return this.propertiesVehicleTypeService.findAllTyreVehicleType();
  }

  @Get('/vehicletype/id')
  findOne(@Param() getPropertyDto: GetPropertyDto) {
    return this.propertiesVehicleTypeService.findTyreVehicleTypeById(
      getPropertyDto,
    );
  }

  @Patch('/vehicletype/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesVehicleTypeService.updateTyreVehicleType(
      updatePropertyDto,
    );
  }

  @Delete('/vehicletype/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propertiesVehicleTypeService.removeTyreVehicleType(
      getPropertyDto,
    );
  }
}
