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
  import { PropsTyreParamsService } from '../props-tyres-services/props-tyre-params.service';
  import { CreatePropertyDto } from '../dto/create-property.dto';
  import { GetPropertyDto } from '../dto/get-property.dto';
  import { UpdatePropertyDto } from '../dto/update-property.dto';
  
  @Controller('properties')
  export class PropertiesParamsController {
    constructor(private readonly propertiesParamsService: PropsTyreParamsService) {}
  
    @Post('/tyres/params/')
    create(@Body() createPropertyDto: CreatePropertyDto) {
      return this.propertiesParamsService.createTyreParams(createPropertyDto);
    };
  
    @Get('/tyres/allparams')
    findAll() {
      return this.propertiesParamsService.findAllTyreParams();
    };
  
    @Get('/tyres/params/id')
    findOne(@Param() getPropertyDto: GetPropertyDto) {
      return this.propertiesParamsService.findTyreParamsById(getPropertyDto);
    };
  
    @Get('/tyres/params/model-by-brand')
    findAllParamsByBrand(@Query('brand') brand: string) {
      return this.propertiesParamsService.findAllTyresParamsByBrand(+brand);
    };

    @Get('/tyres/params/by-model')
    findAllParamsByModel(@Query('model') model: string) {
      return this.propertiesParamsService.findAllTyresParamsByModel(+model);
    };
  
    @Patch('/tyres/params/model/update')
    update(@Body() updatePropertyDto: UpdatePropertyDto) {
      return this.propertiesParamsService.updateTyreParams(updatePropertyDto);
    };
  
    @Delete('/tyres/params/remove')
    remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
      return this.propertiesParamsService.removeTyreParams(getPropertyDto);
    };
  }