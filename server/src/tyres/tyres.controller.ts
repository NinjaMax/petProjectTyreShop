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
import { TyresService } from './tyres.service';
import { CreateTyreDto } from './dto/create-tyre.dto';
import { UpdateTyreDto } from './dto/update-tyre.dto';
import { GetTyreDto } from './dto/get-tyre.dto';

@Controller('api/tyres')

export class TyresController {

  constructor(private readonly tyresService: TyresService) {}

  @Post()
  createTyres(@Body() createTyreDto: CreateTyreDto) {
    return this.tyresService.createTyres(createTyreDto);
  }

  @Get()
  findAllTyres() {
    return this.tyresService.findAllTyres();
  }

  @Get('/all-admin')
  findAllAdminTyres() {
    return this.tyresService.findAllTyresAdmin();
  }

  @Get('/id')
  findTyresById(@Query('id') id: string) {
    return this.tyresService.findTyresByIdQuery(id);
  }

  @Get('/paramid/:id')
  findTyresByParamId(@Param('id') id: string) {
    return this.tyresService.findTyresByIdParam(id);
  }

  @Get('/main-offset')
  findTyresByLimitMain(
    @Query('width') width: string,
    @Query('height') height: string,
    @Query('diameter') diameter: string,
    @Query('season') season: string,
    @Query('brand') brand: string,
    @Query('sort') sort: string,
  ) {
    return this.tyresService.findAllTyresWithOffsetMain(
      width,
      height,
      diameter,
      season,
      brand,
      sort
    );
  }

  @Get('/no-offset')
  findTyresWithoutLimit(
    @Query('price') price: string,
    @Query('type') type: string,
    @Query('speed_index') speed_index: string,
    @Query('load_index') load_index: string,
    @Query('sort') sort: string,
  ) {
    return this.tyresService.findAllTyresWithoutOffset(
      price,
      type,
      speed_index,
      load_index,
      sort,
    );
  }

  @Get('/props-offset')
  findTyresWithoutLimitHeight(
    @Query('studded') studded: string,
    @Query('run_flat') run_flat: string,
    @Query('homologation') homologation: string,
    @Query('reinforce') reinforce: string,
    @Query('sort') sort: string,
  ) {
    return this.tyresService.findAllTyresWithoutOffsetProps(
      studded,
      run_flat,
      homologation,
      reinforce,
      sort,);
  }
  
  @Get('/cat-offset')
  findTyresWithCat(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
    @Query('width') width: string,
    @Query('height') height: string,
    @Query('diameter') diameter: string,
    @Query('season') season: string,
    @Query('brand') brand: string,
    @Query('price') price: string,
    @Query('type') type: string,
    @Query('speed_index') speed_index: string,
    @Query('load_index') load_index: string,
    @Query('studded') studded: string,
    @Query('run_flat') run_flat: string,
    @Query('homologation') homologation: string,
    @Query('reinforce') reinforce: string,
    @Query('sort') sort: string,
  ) {
    return this.tyresService.findAllTyresWithCatOffset(
      +limit,
      +offset,
      width,
      height,
      diameter,
      season,
      brand,
      price,
      type,
      speed_index,
      load_index,
      studded,
      run_flat,
      homologation,
      reinforce,
      sort,
    );
  }

  @Get('/season/:season')
  findTyresSeason(@Param('season') season: string) {
    return this.tyresService.findAllTyresBySeason(season);
  }

  @Get('/diameter/:diameter')
  findTyresDiameter(@Param('diameter') diameter: string) {
    return this.tyresService.findAllTyresByDiameter(diameter);
  }

  @Get('/params/:params')
  findTyresParams(@Param('params') params: string) {
    return this.tyresService.findAllTyresByParams(params);
  }

  @Get('/fullname/:fullname')
  findTyresFullName(@Param('fullname') fullname: string) {
    return this.tyresService.findAllTyresByFullName(fullname);
  }

  @Get('/count/all')
  findCountAllTyres(
    @Query('width') width: string,
    @Query('height') height: string,
    @Query('diameter') diameter: string,
    @Query('season') season: string,
    @Query('brand') brand: string,
    @Query('price') price: string,
    @Query('type') type: string,
    @Query('speed_index') speed_index: string,
    @Query('load_index') load_index: string,
    @Query('studded') studded: string,
    @Query('run_flat') run_flat: string,
    @Query('homologation') homologation: string,
    @Query('reinforce') reinforce: string,
  ) {
    return this.tyresService.findAndCountAllTyres(
      width,
      height,
      diameter,
      season,
      brand,
      price,
      type,
      speed_index,
      load_index,
      studded,
      run_flat,
      homologation,
      reinforce,
    );
  };

  @Get('/params-brand-season')
  findAllTyresByBrandAndParamsAndSeason(
    @Query('params') params: string,
    @Query('brand') brand: string,
    @Query('season') season_ua: string,
  ) {
    return this.tyresService.findAllTyresByBrandParamsSeason(
      params,
      brand,
      season_ua,
    );
  };

  @Get('/params-season')
  findAllTyresByParamsAndSeason(
    @Query('params') params: string,
    @Query('season') season_ua: string,
  ) {
    return this.tyresService.findAllTyresByParamsSeason(params, season_ua);
  };

  @Patch('/update')
  updateTyres(@Body() updateTyreDto: UpdateTyreDto) {
    return this.tyresService.updateTyres(updateTyreDto);
  }

  @Delete('/delete')
  remove(@Body() getTyreDto: GetTyreDto) {
    return this.tyresService.remove(getTyreDto);
  }
}
